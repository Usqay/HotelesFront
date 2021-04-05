import { Product } from './product';

export interface ServiceProduct {
    active ? : boolean
    service_id ? : number
    product_id ? : number
    product ? : Product
    quantity ? : number
    id ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
