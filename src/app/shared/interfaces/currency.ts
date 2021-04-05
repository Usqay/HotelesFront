import { CurrencyRate } from './currency-rate';

export interface Currency {
    active ? : boolean
    code ? : string
    rate ? : CurrencyRate
    id ? : number
    is_base ? : number
    name ? : string
    plural_name ? : string
    symbol ? : string
    today_rate ? : number
    start_amount ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}

