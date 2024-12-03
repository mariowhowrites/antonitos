import type { APIRoute } from "astro";
import { createCheckoutSession } from "../../api/stripe";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const productPrice = body.productPrice;

        const session = await createCheckoutSession(productPrice);

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
        return new Response(
            JSON.stringify({ message: "Something went wrong. Please try again." }), 
            { status: 500 }
        );
    }
};
