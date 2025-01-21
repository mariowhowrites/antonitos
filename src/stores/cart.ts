import type { LineItem } from "@/types";
import { acceptHMRUpdate, defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
    const lineItems = ref<LineItem[]>([]);

    // Load stored items only on client side
    onMounted(() => {
        const storedItems = localStorage.getItem('cartItems');

        if (storedItems) {
            lineItems.value = JSON.parse(storedItems);
        }
    });

    // Save state to localStorage whenever it changes
    watch(
        lineItems,
        (items) => {
            localStorage.setItem('cartItems', JSON.stringify(items));
        },
        { deep: true }
    );


    const addLineItem = (lineItem: LineItem) => {
        lineItems.value.push(lineItem)
    }

    const removeLineItem = (index: number) => {
        lineItems.value.splice(index, 1);
    }

    return {
        lineItems,
        addLineItem,
        removeLineItem,
    };
});


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore as any, import.meta.hot))
  }