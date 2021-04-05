import { People } from './people';
import { Permission } from './permission';
import { Role } from './role';

export interface User {
    active ? : boolean
    name ? : string
    email ? : string
    password ? : string
    id ? : number
    people_id ? : number
    people ? : People
    role ? : Role
    permissions ? : Permission[]
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
