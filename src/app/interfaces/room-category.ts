export interface RoomCategory {
    name ? : string
    id ? : number
    capacity ? : number
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
    activeState ? : boolean //this attribute is only for UI
}
