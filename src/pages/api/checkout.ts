import type { APIRoute } from "astro";
import { createCheckoutSession } from "../../api/stripe";
import type { LineItem } from "@/types";
import Product from "@/models/Product";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const { lineItems } = await request.json() as { lineItems: LineItem[] };

        // validate the body
        const errorMessage = Product.validateLineItems(lineItems);
        if (errorMessage !== null) {
            return new Response(
                JSON.stringify({ message: errorMessage }),
                { status: 400 }
            );
        }

        const session = await createCheckoutSession(lineItems);

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
