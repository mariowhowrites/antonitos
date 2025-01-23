<script setup lang="ts">
const props = defineProps<{
  quantity: number;
}>();
</script>

<template>
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
    <p class="text-base font-medium text-gray-900">{{ quantity }}</p>
    <p class="mt-1 text-sm text-gray-500">Perfect for a reasonable amount of snacks.</p>
    <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-500", Not Checked: "border-transparent"
              -->
    <div
      class="pointer-events-none absolute -inset-px rounded-lg border-2"
      aria-hidden="true"
    ></div>
  </div>
</template>
