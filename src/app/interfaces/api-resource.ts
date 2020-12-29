export interface ApiResource {
    data : any[],
    links : {
        first? : string,
        last? : string,
        next? : string,
        prev? : string,
    },
    meta : {
        current_page : number,
        from : number,
        last_page : number,
        links : PaginationItem[],
        path : string,
        per_page : string,
        to : number,
        total : number
    }
}

export interface PaginationItem {
    active : boolean,
    label : string,
    url : string
}