import type { APIRoute } from "astro";
import { createCheckoutSession } from "../../api/stripe";


export const prerender = false;

// get the product id from the request body
// create a checkout session
// return the session id

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const productId = body.productId;
    const productPrice = body.productPrice;

    const session = await createCheckoutSession(productId, productPrice);

    return new Response(JSON.stringify({ checkoutUrl: session.url }), { status: 200 });
};
