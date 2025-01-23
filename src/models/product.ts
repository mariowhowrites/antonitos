import { pricingTable } from "@/pricing";
import type { LineItem, ProductTable } from "@/types";
import hotSauceImage from "@/images/hot-sauce.jpg";
import chiliPowderImage from "@/images/chili-powder.jpg";

class Product {
    stripeID: string;
    name: string;
    description: string;
    slug: string;
    image: ImageMetadata;
    productTable: ProductTable;

    constructor(stripeProduct: any) {
        this.stripeID = stripeProduct.id;
        this.name = stripeProduct.name;
        this.description = stripeProduct.description;
        this.image = this.name === "Hot Sauce" ? hotSauceImage : chiliPowderImage;
        this.slug = stripeProduct.metadata.slug;
        this.productTable = pricingTable[this.name];
    }

    public static getPrice(product: Product, quantity: number) {
        return product.productTable[quantity].price;
    }

    public static validateLineItems(lineItems: LineItem[]): string | null {
        let errorMessage: string | null = null;
    
        lineItems.forEach(lineItem => {
            // check if the product name is valid
            if (!Object.keys(pricingTable).includes(lineItem.product.name)) {
                errorMessage = "Invalid product name: " + lineItem.product.name
            }

            const productTable = pricingTable[lineItem.product.name];
    
            // check if the quantity is valid
            if (!Object.keys(productTable).includes(lineItem.quantity.toString())) {
                errorMessage = "Invalid quantity: " + lineItem.quantity
            }

            // check if the unit amount is valid
            if (lineItem.unitAmount !== productTable[lineItem.quantity].price / lineItem.quantity) {
                errorMessage = "Invalid unit amount: " + lineItem.unitAmount
            }
        });
    
        return errorMessage;
    }
}

export default Product;