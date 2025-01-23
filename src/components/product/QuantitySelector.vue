<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { defineModel } from 'vue';

const selectedQuantity = defineModel<number>();
const props = defineProps<{
  productTable: ProductTable;
}>();
</script>

<template>
  <fieldset>
    <legend class="block text-sm font-medium text-gray-300">Quantity</legend>
    <RadioGroup v-model="selectedQuantity" class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <RadioGroupOption
        as="template"
        v-for="(priceData, quantity) in productTable"
        :key="quantity"
        :value="parseInt(quantity)"
        :aria-label="quantity"
        :aria-description="priceData.description"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            active ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'bg-gray-50',
            'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none',
          ]"
        >
          <p class="text-base font-medium text-gray-900">{{ quantity }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ priceData.description }}</p>
          <div
            :class="[
              active ? 'border' : 'border-2',
              checked ? 'border-indigo-500' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg',
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </fieldset>
</template>
