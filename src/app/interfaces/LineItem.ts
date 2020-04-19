import { Size } from './Size';

export interface LineItem {
    product: any;
    qty: number;
    size?: Size;
}