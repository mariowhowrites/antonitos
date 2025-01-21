type Quantity = number;
type TotalDollarAmount = number;
type ProductName = string;

export const pricingTable: Record<ProductName, Record<Quantity, TotalDollarAmount>> = {
    "Hot Sauce": {
        1: 16,
        3: 39,
        5: 55
    },
    "Chili Powder": {
        1: 12,
        3: 30,
        5: 45
    }
}