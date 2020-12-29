import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { ContentComponent } from "./shared/components/layout/content/content.component";

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { 
        path: 'currencies',
        loadChildren: () => import('./pages/currencies/currencies.module').then(m => m.CurrenciesModule)
      },
      { 
        path: 'room-categories',
        loadChildren: () => import('./pages/room-categories/room-categories.module').then(m => m.RoomCategoriesModule)
      },
      { 
        path: 'room-statuses',
        loadChildren: () => import('./pages/room-statuses/room-statuses.module').then(m => m.RoomStatusesModule)
      },
      { 
        path: 'rooms',
        loadChildren: () => import('./pages/rooms/rooms.module').then(m => m.RoomsModule)
      },
      { 
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      { 
        path: 'services',
        loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule)
      },
      { 
        path: 'store-houses',
        loadChildren: () => import('./pages/store-houses/store-houses.module').then(m => m.StoreHousesModule)
      },
      { 
        path: 'store-house-movements',
        loadChildren: () => import('./pages/store-house-movements/store-house-movements.module').then(m => m.StoreHouseMovementsModule)
      },
      { 
        path: 'reservations',
        loadChildren: () => import('./pages/reservations/reservations.module').then(m => m.ReservationsModule)
      },
      { 
        path: 'turns',
        loadChildren: () => import('./pages/turns/turns.module').then(m => m.TurnsModule)
      },
      { 
        path: 'daily-operations',
        loadChildren: () => import('./pages/daily-operations/daily-operations.module').then(m => m.DailyOperationsModule)
      },
      { 
        path: 'cash-registers',
        loadChildren: () => import('./pages/cash-registers/cash-registers.module').then(m => m.CashRegistersModule)
      },
      { 
        path: 'cash-register-movements',
        loadChildren: () => import('./pages/cash-register-movements/cash-register-movements.module').then(m => m.CashRegisterMovementsModule)
      },
      { 
        path: 'system-configurations',
        loadChildren: () => import('./pages/system-configurations/system-configurations.module').then(m => m.SystemConfigurationsModule)
      },
      { 
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
      { 
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      { 
        path: 'sales',
        loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule)
      },
      { 
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
      },
      { 
        path: 'printers',
        loadChildren: () => import('./pages/printers/printers.module').then(m => m.PrintersModule)
      },
      { 
        path: 'electronic-vouchers',
        loadChildren: () => import('./pages/electronic-vouchers/electronic-vouchers.module').then(m => m.ElectronicVouchersModule)
      },
      { 
        path: 'kardex',
        loadChildren: () => import('./pages/kardex/kardex.module').then(m => m.KardexModule)
      },
      { 
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [UnauthenticatedGuard]
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    useHash : true
  })],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
