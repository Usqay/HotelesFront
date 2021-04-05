import { Guest } from './guest';
import { Reservation } from './reservation';

export interface ReservationGuest {
    active ? : boolean
    id ? : number
    reservation_id ? : number
    reservation ? : Reservation
    guest_id ? : number
    guest ? : Guest
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
