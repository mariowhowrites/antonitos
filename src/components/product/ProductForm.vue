<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import type { Product, LineItem } from "@/types";
import { pricingTable } from "@/pricing";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const props = defineProps<{
  product: Product;
}>();

const store = useCartStore();

const { lineItems } = storeToRefs(store);
const { addLineItem } = store;

const errorMessage = ref("");

const defaults = pricingTable[props.product.name];

const quantity = ref(1);

const dollarPrice = computed(() => pricingTable[props.product.name][quantity.value]);

const buttonText = computed(() => {
  return isCheckingOut.value ? "Sending you to Stripe..." : "Get the Sauce";
});

function _addToCart() {
  addLineItem({
    quantity: quantity.value,
    product: props.product,
    unitAmount: dollarPrice.value,
  });

  window.location.href = "/cart";
}

</script>

<template>
  <div class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
    <section aria-labelledby="options-heading">
      <h2 id="options-heading" class="sr-only">Product options</h2>

      <div class="sm:flex sm:justify-between mt-4">
        <!-- Quantity selector -->
        <fieldset>
          <legend class="block text-sm font-medium text-white">Quantity</legend>
          <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <!-- Active: "ring-2 ring-indigo-500" -->
            <div
              aria-label="1"
              aria-description="Perfect for a reasonable amount of snacks."
              :class="{
                'relative block cursor-pointer rounded-lg border bg-gray-100 border-gray-300 p-4 focus:outline-none': true,
                'ring-2 ring-indigo-500': quantity === 1,
              }"
              @click="quantity = 1"
            >
              <input type="radio" name="size-choice" value="1" class="sr-only" />
              <p class="text-base font-medium text-gray-900">1</p>
              <p class="mt-1 text-sm text-gray-500">
                Perfect for a reasonable amount of snacks.
              </p>
              <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-500", Not Checked: "border-transparent"
              -->
              <div
                class="pointer-events-none absolute -inset-px rounded-lg border-2"
                aria-hidden="true"
              ></div>
            </div>

            <!-- Active: "ring-2 ring-indigo-500" -->

            <div
              aria-label="3"
              aria-description="Enough room for a serious amount of snacks."
              :class="{
                'relative block cursor-pointer rounded-lg border bg-gray-100 border-gray-300 p-4 focus:outline-none': true,
                'ring-2 ring-indigo-500': quantity === 3,
              }"
              @click="quantity = 3"
            >
              <input type="radio" name="size-choice" value="3" class="sr-only" />
              <p class="text-base font-medium text-gray-900">3</p>
              <p class="mt-1 text-sm text-gray-500">
                Enough room for a serious amount of snacks.
              </p>

              <!--
                            Active: "border", Not Active: "border-2"
                            Checked: "border-indigo-500", Not Checked: "border-transparent"
                      -->

              <div
                class="pointer-events-none absolute -inset-px rounded-lg border-2"
                aria-hidden="true"
              ></div>
            </div>

            <div
              aria-label="5"
              aria-description="Enough room for a serious amount of snacks."
              :class="{
                'relative block cursor-pointer rounded-lg border bg-gray-100 border-gray-300 p-4 focus:outline-none': true,
                'ring-2 ring-indigo-500': quantity === 5,
              }"
              @click="quantity = 5"
            >
              <input type="radio" name="size-choice" value="5" class="sr-only" />
              <p class="text-base font-medium text-gray-900">5</p>
              <p class="mt-1 text-sm text-gray-500">
                Enough room for a serious amount of snacks.
              </p>

              <!--
                            Active: "border", Not Active: "border-2"
                            Checked: "border-indigo-500", Not Checked: "border-transparent"
                      -->

              <div
                class="pointer-events-none absolute -inset-px rounded-lg border-2"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="mt-10">
        <div class="flex items-center mb-8">
          <p class="text-lg text-green-500 font-bold sm:text-xl">${{ dollarPrice }}</p>
        </div>
        <button
          id="checkout-button"
          ref="checkoutButton"
          type="submit"
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-antonito-red px-8 py-3 text-base font-bold text-white hover:bg-antonito-tan focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          @click="_addToCart"
        >
          Add to Cart
        </button>
      </div>
      <div class="mt-6 text-center">
        <a href="#" class="group inline-flex text-base font-medium">
          <svg
            class="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            ></path>
          </svg>
          <span class="text-gray-200 hover:text-gray-400">Really Good Guarantee</span>
        </a>
      </div>
    </section>
  </div>
</template>
