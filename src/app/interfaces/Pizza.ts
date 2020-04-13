export interface Pizza {
    name: string;
    basePrice: number;
    baseCurrency: string;
    basicToppings: [];
    extraToppings?: [];
    size: [];
    pictureUri?: string[];
}
