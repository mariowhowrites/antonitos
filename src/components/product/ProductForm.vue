<script setup lang="ts">
import { ref, defineProps, computed, watch } from "vue";
import type { ProductTable, LineItem } from "@/types";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import QuantitySelector from "./QuantitySelector.vue";
import Product from "@/models/product";

const { product } = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const { lineItems } = storeToRefs(cartStore);
const { addLineItem } = cartStore;

const quantity = ref("1");
const dollarPrice = computed(() => Product.getPrice(product, quantity.value));

function addToCart() {
  addLineItem({
    quantity: quantity.value,
    product: product,
    unitAmount: dollarPrice.value / quantity.value,
  });

  window.location.href = "/cart";
}

</script>

<template>
  <div class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
    <section aria-labelledby="options-heading">
      <h2 id="options-heading" class="sr-only">Product options</h2>

      <div class="sm:flex sm:justify-between mt-4">
        <QuantitySelector v-model="quantity" :product-table="product.productTable"/>
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
          @click="addToCart"
        >
          Get the Sauce
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
