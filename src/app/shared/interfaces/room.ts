import { RoomCategory } from './room-category';
import { RoomPrice } from './room-price';
import { RoomProduct } from './room-product';
import { RoomStatus } from './room-status';

export interface Room {
    active ? : boolean
    name ? : string
    description ? : string
    capacity ? : number
    room_category_id ? : number
    room_status_id ? : number
    room_category ? : RoomCategory
    room_status ? : RoomStatus
    room_prices ? : RoomPrice[]
    room_products ? : RoomProduct[]
    id ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
    hoverState ? : boolean
}
