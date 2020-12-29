import { ServicePrice } from './service-price';
import { ServiceProduct } from './service-product';
import { SunatCode } from './sunat-code';

export interface Service {
    active ? : boolean
    name ? : string
    description ? : string
    sunat_code ? : SunatCode | string
    id ? : number
    prices ? : ServicePrice[]
    products ? : ServiceProduct[]
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
