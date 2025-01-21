export interface Product {
    name: string;
    id: string;
    metadata: {
        slug: string;
    };
}

export interface LineItem {
    product: Product;
    quantity: number,
    unitAmount: number
}