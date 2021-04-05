import { Currency } from './currency';

export interface ServicePrice {
    active ? : boolean
    currency ? : Currency
    currency_id ? : number
    sale_price ? : number
    id ? : number
    service_id ? : number
    is_base ? : boolean
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
