import type { APIRoute } from "astro";
import { createCheckoutSession } from "../../api/stripe";
import type { LineItem, Product } from "@/types";
import { pricingTable } from "@/pricing";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const { lineItems } = await request.json() as { lineItems: LineItem[] };
        const errorMessage = validateLineItems(lineItems);

        // validate the body
        if (errorMessage !== null) {
            return new Response(
                JSON.stringify({ message: errorMessage }),
                { status: 400 }
            );
        }

        const session = await createCheckoutSession(lineItems.map((lineItem) => ({
            ...lineItem,
            unitAmount: pricingTable[lineItem.product.name][lineItem.quantity] / lineItem.quantity * 100
        })));

        if (!session?.url) {
            return new Response(
                JSON.stringify({ message: "Failed to create checkout session" }),
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({ checkoutUrl: session.url }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({ message: "Something went wrong. Please try again." }),
            { status: 500 }
        );
    }
};


function validateLineItems(lineItems: LineItem[]): string | null {
    let errorMessage: string | null = null;

    lineItems.forEach(lineItem => {
        if (!Object.keys(pricingTable).includes(lineItem.product.name)) {
            errorMessage = "Invalid product name: " + lineItem.product.name
        }

        if (!Object.keys(pricingTable[lineItem.product.name]).includes(lineItem.quantity.toString())) {
            errorMessage = "Invalid quantity: " + lineItem.quantity
        }
    });

    return errorMessage;
}
