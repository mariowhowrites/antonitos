<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { defineModel } from "vue";

const selectedQuantity = defineModel<string>();
const props = defineProps<{
  productTable: ProductTable;
}>();
</script>

<template>
  <div class="flex flex-col">
    <legend class="block text-sm font-medium text-gray-300">Quantity</legend>
    <fieldset aria-label="Choose a size" class="mt-2">
      <RadioGroup v-model="selectedQuantity" class="grid grid-cols-3 gap-3 w-full">
        <RadioGroupOption
          as="template"
          v-for="(priceData, quantity) in productTable"
          :key="quantity"
          :value="quantity"
          v-slot="{ active, checked }"
        >
          <div
            :class="[
              active ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
              checked
                ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
              'flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium uppercase sm:flex-1',
            ]"
          >
            {{ quantity }}
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </fieldset>
  </div>
</template>
