import { People } from './people';

export interface Client {
    active ? : boolean
    id ? : number
    people_id ? : number
    people ? : People
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
