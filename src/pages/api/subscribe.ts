import type { APIRoute } from "astro";
import { subscribe } from "../../api/mailerlite";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    
    const response = await subscribe(body.email);
    
    if (response.data) {
        return new Response(JSON.stringify(response.data), { status: 200 });
    }

    return new Response(JSON.stringify(response.message), { status: 400 });
};
