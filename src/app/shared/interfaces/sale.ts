import { Client } from './client';
import { People } from './people';
import { Product } from './product';
import { SaleState } from './sale-state';
import { Service } from './service';
import { TurnChange } from './turn-change';

export interface Sale {
    active ? : boolean
    id ? : number
    description ? : string
    client_id ? : number
    client ? : Client
    turn_change_id ? : number
    turn_change ? : TurnChange
    sale_state_id ? : number
    sale_state ? : SaleState
    payments ? : any[]
    products ? : Product[] | any[]
    services ? : Service[] | any[]
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
    reservation_id ? : number
    
    //FOR UI
    client_name ? : string
    totals ? : any[]
    people ? : People
    room_id ? : number
}
