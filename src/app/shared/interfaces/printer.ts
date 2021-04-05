import { PrinterType } from './printer-type';

export interface Printer {
    active ? : boolean
    name ? : string
    port ? : number
    ip_address ? : string
    printer_type_id ? : number
    printer_type : PrinterType
    created_at ? : Date
    updated_at ? : Date
    deleted_at ? : Date
}
