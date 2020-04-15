import { Topping } from './Topping';
import { Size } from './Size';

export interface Pizza {
    name: string;
    basePrice: number;
    price: number;
    baseCurrency: string;
    toppings: Topping[];
    extraToppings?: Topping[];
    sizes: Size[];
    dia: number;
    pictureFilename?: string[];
    description?: string;
}
