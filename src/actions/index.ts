// import { defineAction } from "astro:actions";
// import { z } from "astro:schema";

// export const server = {
//     getStripeProducts: defineAction({
//         input: z.object({
//             stripeSecretKey: z.string(),
//         }),
//         handler: async ({ input }) => {
//             const stripe = new Stripe(input.stripeSecretKey);
//         }
//     })
// }