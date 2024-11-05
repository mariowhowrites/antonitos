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

async function postToStripe(endpoint: string, params: Record<string, string> = {}, body: Record<string, any> = {}) {
    const url = new URL(`${STRIPE_API_URL}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

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

async function createCheckoutSession(productId: string, productPrice: string) {
    const response = await postToStripe("/checkout/sessions", {}, {
        mode: "payment",
        success_url: "http://localhost:4321/thank-you",
        cancel_url: "http://localhost:4321",
        'line_items[0][price]': productPrice,
        'line_items[0][quantity]': "1"
    });

    return response;
}

export { fetchFromStripe, createCheckoutSession };