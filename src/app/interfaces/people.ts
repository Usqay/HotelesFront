import { DocumentType } from './document-type';
import { Gender } from './gender';

export interface People {
    active ? : boolean
    id ? : number
    name ? : string
    last_name ? : string
    full_name ? : string
    gender_id ? : number
    gender ? : Gender
    document_type_id ? : number
    document_type ? : DocumentType
    document_number ? : string
    address ? : string
    phone_number ? : string
    email ? : string
    birthday_date ? : Date
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
