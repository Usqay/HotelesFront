import { Product } from './product';
import { ProductMovementType } from './product-movement-type';

export interface ProductMovement {
    id ? : number
    active ? : boolean
    product_id ? : number
    store_house_movement_id ? : number
    product_movement_type_id ? : number
    quantity ? : number
    product ? : Product
    product_movement_type ? : ProductMovementType
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
