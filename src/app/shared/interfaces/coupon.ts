export interface Coupon {
    active ? : boolean
    id ? : number
    name ? : string
    description ? : string
    code ? : string
    expiration_date ? : Date
    disscount_type ? : boolean
    disscount_value ? : number
    stock ? : number
    uses ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
