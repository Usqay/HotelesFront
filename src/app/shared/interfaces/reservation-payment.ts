import { Currency } from './currency';
import { PaymentMethod } from './payment-method';
import { People } from './people';

export interface ReservationPayment {
    active ? : boolean
    id ? : number
    description ? : string
    reservation_id ? : number
    currency_id ? : number
    currency ? : Currency
    payment_method_id ? : number
    payment_method ? : PaymentMethod
    cash_register_movement_id ? : number
    people_id ? : number
    people ? : People
    total ? : number
    print_payment ? : boolean
    document_type ? : string
    payment_by ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
