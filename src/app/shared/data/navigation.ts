export const MenuItemsRoot = [
    { path: '/dashboard', icon: 'home', title: 'Inicio', type: 'link' },
    {
        title: 'Reservaciones', icon: 'book-open', type: 'sub', badgeType: 'success', active: false, children: [
            { path: '/reservations', title: 'Listar', type: 'link', permission : 'read-reservations' },
            { path: '/reservations/create', title: 'Crear', type: 'link', permission : 'create-reservations' },
        ]
    },
    {
        title: 'Ventas', icon: 'shopping-bag', type: 'sub', badgeType: 'success', active: false, children: [
            { path: '/sales', title: 'Listar', type: 'link', permission : 'read-sales' },
            { path: '/sales/create', title: 'Crear', type: 'link', permission : 'create-sales' },
            { path: '/electronic-vouchers', title: 'Comprobantes', type: 'link', permission : 'read-electronic-vouchers' },
        ]
    },
    {
        title: 'Habitaciones', icon: 'key', type: 'sub', badgeType: 'success', active: false, children: [
            { path: '/rooms', title: 'Listar', type: 'link', permission : 'read-rooms' },
            { path: '/rooms/create', title: 'Crear', type: 'link', permission : 'create-rooms' },
        ]
    },
    {
        title: 'Cajas', icon: 'dollar-sign', type: 'sub', badgeType: 'success', active: false, children: [
            { path: '/cash-registers', title: 'Listar', type: 'link', permission : 'read-cash-registers' },
            { path: '/cash-registers/create', title: 'Crear', type: 'link', permission : 'create-cash-registers' },
            { path: '/cash-register-movements', title: 'Movimientos', type: 'link', permission : 'read-cash-register-movements' },
        ]
    },
    {
        title: 'Almacen', icon: 'box', type: 'sub', badgeType: 'success', active: false, children: [
            {
                title: 'Almacenes', type: 'sub', children: [
                    { path: '/store-houses', title: 'Listar', type: 'link', permission : 'read-store-houses' },
                    { path: '/store-houses/create', title: 'Crear', type: 'link', permission : 'create-store-houses' },
                ]
            },
            {
                title: 'Productos', type: 'sub', children: [
                    { path: '/products', title: 'Listar', type: 'link', permission : 'read-products' },
                    { path: '/products/create', title: 'Crear', type: 'link', permission : 'create-products' },
                ]
            },
            {
                title: 'Servicios', type: 'sub', children: [
                    { path: '/services', title: 'Listar', type: 'link', permission : 'read-services' },
                    { path: '/services/create', title: 'Crear', type: 'link', permission : 'create-services' },
                ]
            },
            {
                title: 'Movimientos', type: 'sub', children: [
                    { path: '/store-house-movements', title: 'Listar', type: 'link', permission : 'read-store-house-movements' },
                    { path: '/store-house-movements/create', title: 'Crear', type: 'link', permission : 'create-store-house-movements' },
                ]
            },
            { path: '/kardex', title: 'Kardex', type: 'link', permission : 'read-kardex' },
        ]
    },
    {
        title: 'Reportes', icon: 'pie-chart', type: 'sub', badgeType: 'success', active: false, children: [
            { path: '/reports/rooms', title: 'Reporte de habitaciones', type: 'link', permission : 'read-report-rooms' },
            { path: '/reports/reservations', title: 'Reporte de reservaciones', type: 'link', permission : 'read-report-reservations' },
            { path: '/reports/sales', title: 'Reporte de ventas', type: 'link', permission : 'read-report-sales' },
            // { path: '/reports/cash-registers', title: 'Reporte de caja', type: 'link', permission : 'read-report-cash_registers' },
            { path: '/reports/dayli', title: 'Cuadre diario', type: 'link', permission : 'read-report-dayli' },
        ]
    },
    {
        title: 'Configuración', icon: 'settings', type: 'sub', badgeType: 'success', active: true, children: [
            {
                title: 'Monedas', type: 'sub', children: [
                    { path: '/currencies', title: 'Listar', type: 'link', permission : 'read-currencies' },
                    { path: '/currencies/create', title: 'Crear', type: 'link', permission : 'create-currencies' },
                ]
            },
            {
                title: 'Impresoras', type: 'sub', children: [
                    { path: '/printers', title: 'Listar', type: 'link', permission : 'read-printers' },
                    { path: '/printers/create', title: 'Crear', type: 'link', permission : 'create-printers' },
                ]
            },
            {
                title: 'Turnos', type: 'sub', children: [
                    { path: '/turns', title: 'Listar', type: 'link', permission : 'read-turns' },
                    { path: '/turns/create', title: 'Crear', type: 'link', permission : 'create-turns' },
                ]
            },
            {
                title: 'Categorías de habitación', type: 'sub', children: [
                    { path: '/room-categories', title: 'Listar', type: 'link', permission : 'read-room-categories' },
                    { path: '/room-categories/create', title: 'Crear', type: 'link', permission : 'create-room-categories' },
                ]
            },
            {
                title: 'Estados de habitación', type: 'sub', children: [
                    { path: '/room-statuses', title: 'Listar', type: 'link', permission : 'read-room-statuses' },
                    { path: '/room-statuses/create', title: 'Crear', type: 'link', permission : 'create-room-statuses' },
                ]
            },
            {
                title: 'Roles y permisos', type: 'sub', children: [
                    { path: '/roles', title: 'Listar roles', type: 'link', permission : 'read-roles' },
                    { path: '/roles/create', title: 'Crear rol', type: 'link', permission : 'create-roles' },
                ]
            },
            {
                title: 'Usuarios', type: 'sub', children: [
                    { path: '/users', title: 'Listar', type: 'link', permission : 'read-users' },
                    { path: '/users/create', title: 'Crear', type: 'link', permission : 'create-users' },
                ]
            },
            {
                title: 'Operaciones diarias', type: 'sub', children: [
                    { path: '/daily-operations/turn-opening', title: 'Apertura de turno', type: 'link' },
                ]
            },
            { path: '/system-configurations', title: 'Configuraciones del sistema', type: 'link', permission : 'read-system-configurations' },
        ]
    },
];


// const newMenuItems = MenuItemsRoot.filter(item => {
//     if(item.type == 'sub'){
//         item.children = item.children.filter
//     }
// })

