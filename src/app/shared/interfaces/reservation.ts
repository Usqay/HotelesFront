import { Client } from './client';
import { Coupon } from './coupon';
import { Guest } from './guest';
import { ReservationGuest } from './reservation-guest';
import { ReservationOrigin } from './reservation-origin';
import { ReservationRoom } from './reservation-room';
import { ReservationState } from './reservation-state';
import { Room } from './room';
import { TurnChange } from './turn-change';

export interface Reservation {
    active ? : boolean
    id ? : number
    start_date ? : Date | string
    end_date ? : Date | string
    description ? : string
    client_id ? : number
    client ? : Client
    reservation_origin_id ? : number
    reservation_origin ? : ReservationOrigin
    coupon_id ? : number
    coupon ? : Coupon
    turn_change_id ? : number
    turn_change ? : TurnChange
    reservation_state_id ? : number
    reservation_state ? : ReservationState
    total_days ? : number
    total_hours ? : number
    guests ? : ReservationGuest[]
    payments ? : any[]
    rooms ? : ReservationRoom[]
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date

    //FOR UI
    client_name ? : string
}
