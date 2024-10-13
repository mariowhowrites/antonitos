const STRIPE_SECRET_KEY = import.meta.env.STRIPE_API_KEY;
const STRIPE_API_URL = "https://api.stripe.com/v1";

async function fetchFromStripe(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${STRIPE_API_URL}${endpoint}`);
    url.searchParams.set("expand[]", "data.default_price");

    console.debug("url", url.toString());

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

export { fetchFromStripe };