import { ProductMovement } from './product-movement';
import { StoreHouse } from './store-house';
import { StoreHouseMovementType } from './store-house-movement-type';

export interface StoreHouseMovement {
    id ? : number
    active ? : boolean
    store_house_id ? : number
    store_house ? : StoreHouse
    store_house_movement_type_id ? : number
    store_house_movement_type ? : StoreHouseMovementType
    description ? : string
    products ? : ProductMovement[]
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
