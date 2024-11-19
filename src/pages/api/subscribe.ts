import type { APIRoute } from "astro";
import { subscribe } from "../../api/mailerlite";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    
    const response = await subscribe(body.email);

    console.log(response);

    return new Response(JSON.stringify(response), { status: 200 });
};
