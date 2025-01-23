export interface Product {
    stripeID: string;
    name: string;
    description: string;
    image: ImageMetadata;
    slug: string;
    productTable: ProductTable;
}

export interface LineItem {
    product: Product;
    quantity: number,
    unitAmount: number
}

type Quantity = number;
type TotalDollarAmount = number;
type ProductName = string;

export type PricingTable = Record<ProductName, ProductTable>;
export type ProductTable = Record<Quantity, { price: TotalDollarAmount, description: string }>;
