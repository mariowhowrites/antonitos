<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const store = useCartStore();

const { lineItems } = storeToRefs(store);
const { removeLineItem } = store;

const isCheckingOut = ref(false);
const errorMessage = ref("");

const isButtonDisabled = computed(() => {
  return isCheckingOut.value;
});

const cartTotal = computed(() => {
  return lineItems.value.reduce((total, lineItem) => {
    return total + lineItem.unitAmount;
  }, 0);
});

async function handleCheckout() {
  isCheckingOut.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        lineItems: lineItems.value,
      }),
    });

    const data = await response.json();

    if (response.status === 200 && data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      errorMessage.value = data.message || "Failed to create checkout session";
      isCheckingOut.value = false;
    }
  } catch (error) {
    errorMessage.value = "Something went wrong. Please try again.";
    isCheckingOut.value = false;
  }
}
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      <form class="mt-12" @submit.prevent="handleCheckout">
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            role="list"
            class="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li
              v-for="(lineItem, index) in lineItems"
              :key="lineItem.name"
              class="flex py-6"
            >
              <div class="shrink-0">
                <!-- <img
                  :src="lineItem.product.imageSrc"
                  :alt="lineItem.product.imageAlt"
                  class="size-24 rounded-md object-cover sm:size-32"
                /> -->
                <slot :name="lineItem.product.metadata.slug + '-image'" :index="index" />
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <a href="#" class="font-medium text-gray-700 hover:text-gray-800">{{
                        lineItem.product.name + " x " + lineItem.quantity
                      }}</a>
                    </h4>
                    <p class="ml-4 text-sm font-medium text-green-500">
                      ${{ lineItem.unitAmount }}
                    </p>
                  </div>
                  <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ product.size }}</p> -->
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between">
                  <p class="flex items-center space-x-2 text-sm text-gray-700">
                    <svg
                      class="size-5 shrink-0 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      class="size-5 shrink-0 text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>In stock</span>
                  </p>
                  <div class="ml-4">
                    <button
                      type="button"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      @click="removeLineItem(index)"
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-10">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">Subtotal</dt>
                <dd class="ml-4 text-base font-medium text-gray-900">${{ cartTotal }} </dd>
              </div>
            </dl>
            <p class="mt-1 text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>

          <div class="mt-10">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
            <p
              v-if="errorMessage"
              id="checkout-message"
              ref="checkoutMessage"
              class="mt-2 text-sm text-center text-red-500"
            >
              {{ errorMessage }}
            </p>
          </div>

          <div class="mt-6 text-center text-sm">
            <p>
              or{{ " " }}
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>
