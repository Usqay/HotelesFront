import { Currency } from './currency';
import { People } from './people';
import { Room } from './room';

export interface ReservationRoom {
    active ? : boolean
    id ? : number
    room_id ? : number
    room ? : Room
    reservation_id ? : number
    total_price ? : number
    currency_id ? : number
    currency ? : Currency
    price_type ? : string
    price_value ? : number
    rate_value ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date

    //for UI
    people ? : People
}
