import { ProductPrice } from './product-price';
import { SunatCode } from './sunat-code';

export interface Product {
    active ? : boolean
    name ? : string
    description ? : string
    sunat_code ? : SunatCode | string
    id ? : number
    prices ? : ProductPrice[]
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}