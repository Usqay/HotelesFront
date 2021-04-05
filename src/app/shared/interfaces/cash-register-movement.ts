import { CashRegister } from './cash-register';
import { CashRegisterMovementType } from './cash-register-movement-type';
import { Currency } from './currency';

export interface CashRegisterMovement {
    active ? : boolean
    currency_id ? : number
    currency ? : Currency
    cash_register_movement_type_id ? : number
    cash_register_movement_type ? : CashRegisterMovementType
    cash_register_id ? : number
    cash_register ? : CashRegister
    turn_change_id ? : number
    user_id ? : number
    amount ? : number
    description ? : string
    additional_info ? : any
    id ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date

    //For UI
    currencySymbol ? : string
}