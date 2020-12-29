import { Permission } from './permission';

export interface Role {
    name ? : string
    id ? : number
    permissions ? : Permission[]
    created_at ? : Date
    updated_at ? : Date
}
