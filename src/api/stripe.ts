import type { LineItem, Product } from "@/types";

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_API_KEY;
const STRIPE_API_URL = "https://api.stripe.com/v1";

async function fetchFromStripe(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${STRIPE_API_URL}${endpoint}`);
    url.searchParams.set("expand[]", "data.default_price");

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return await response.json();
}

async function postToStripe(endpoint: string, body: Record<string, any> = {}) {
    const url = new URL(`${STRIPE_API_URL}${endpoint}`);

    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
    });

    return await response.json();
}

async function createCheckoutSession(lineItems: LineItem[]) {
    const requestBody = buildLineItems(lineItems, {
        mode: "payment",
        success_url: "https://antonitos.shop/thank-you",
        cancel_url: "https://antonitos.shop/cart",
        'shipping_address_collection[allowed_countries][0]': "US",
    });

    console.debug(requestBody);

    return postToStripe("/checkout/sessions", requestBody);
}

function buildLineItems(lineItems: LineItem[], requestBody: Record<string, any>): Record<string, any> {
    lineItems.forEach((lineItem, index) => {
        requestBody['line_items[' + index + '][price_data][product]'] = lineItem.product.id;
        requestBody['line_items[' + index + '][price_data][unit_amount_decimal]'] = Math.floor(lineItem.unitAmount);
        requestBody['line_items[' + index + '][quantity]'] = lineItem.quantity
        requestBody['line_items[' + index + '][price_data][currency]'] = "usd";
    })

    return requestBody;
}


export { fetchFromStripe, createCheckoutSession };