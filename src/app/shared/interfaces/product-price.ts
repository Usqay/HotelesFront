import { Currency } from './currency';

export interface ProductPrice {
    active ? : boolean
    currency ? : Currency
    currency_id ? : number
    purchase_price ? : number
    sale_price ? : number
    id ? : number
    product_id ? : number
    is_base ? : boolean
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
