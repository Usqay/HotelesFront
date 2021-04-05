import { Currency } from './currency';

export interface RoomPrice {
    active ? : true,
    currency ? : Currency,
    currency_id ? : number,
    day_price ? : number,
    hour_price ? : number,
    id ? : number,
    room_id ? : number,
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}