import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import {LayoutComponent} from './layout.component';
//import { AuthGuard } from '../helpers/auth.guard';




const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full',canActivate: [AuthenticatedGuard],
        //data: { roles: [Role.Admin] }

      },
     
      // ---------------------------------------------------------->
      // Dashboard
      // ---------------------------------------------------------->
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'reservations',
        loadChildren: () => import('../pages/reservations/reservations.module').then(m => m.ReservationsModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'reservations/create',
        loadChildren: () => import('../pages/reservations/reservations.module').then(m => m.ReservationsModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'sales',
        loadChildren: () => import('../pages/sales/sales.module').then(m => m.SalesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'sales/create',
        loadChildren: () => import('../pages/sales/sales.module').then(m => m.SalesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'electronic-vouchers',
        loadChildren: () => import('../pages/electronic-vouchers/electronic-vouchers.module').then(m => m.ElectronicVouchersModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'rooms',
        loadChildren: () => import('../pages/rooms/rooms.module').then(m => m.RoomsModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'rooms/create',
        loadChildren: () => import('../pages/rooms/rooms.module').then(m => m.RoomsModule),
        canActivate: [AuthenticatedGuard],

      },
     {
        path: 'room-categories',
        loadChildren: () => import('../pages/room-categories/room-categories.module').then(m => m.RoomCategoriesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'room-categories/create',
        loadChildren: () => import('../pages/room-categories/room-categories.module').then(m => m.RoomCategoriesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'room-statuses',
        loadChildren: () => import('../pages/room-statuses/room-statuses.module').then(m => m.RoomStatusesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'room-statuses/create',
        loadChildren: () => import('../pages/room-statuses/room-statuses.module').then(m => m.RoomStatusesModule),
        canActivate: [AuthenticatedGuard],

      },

      {
        path: 'cash-registers',
        loadChildren: () => import('../pages/cash-registers/cash-registers.module').then(m => m.CashRegistersModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'cash-registers/create',
        loadChildren: () => import('../pages/cash-registers/cash-registers.module').then(m => m.CashRegistersModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'cash-register-movements',
        loadChildren: () => import('../pages/cash-register-movements/cash-register-movements.module').then(m => m.CashRegisterMovementsModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'store-houses',
        loadChildren: () => import('../pages/store-houses/store-houses.module').then(m => m.StoreHousesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'products',
        loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'services',
        loadChildren: () => import('../pages/services/services.module').then(m => m.ServicesModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'store-house-movements',
        loadChildren: () => import('../pages/store-house-movements/store-house-movements.module').then(m => m.StoreHouseMovementsModule),
        canActivate: [AuthenticatedGuard],

      },
     {
        path: 'kardex',
        loadChildren: () => import('../pages/kardex/kardex.module').then(m => m.KardexModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'reports',
        loadChildren: () => import('../pages/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [AuthenticatedGuard],

      },
      {
        path: 'currencies',
        loadChildren: () => import('../pages/currencies/currencies.module').then(m => m.CurrenciesModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'currencies/create',
        loadChildren: () => import('../pages/currencies/currencies.module').then(m => m.CurrenciesModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'printers',
        loadChildren: () => import('../pages/printers/printers.module').then(m => m.PrintersModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'printers/create',
        loadChildren: () => import('../pages/printers/printers.module').then(m => m.PrintersModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'turns',
        loadChildren: () => import('../pages/turns/turns.module').then(m => m.TurnsModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'turns/create',
        loadChildren: () => import('../pages/turns/turns.module').then(m => m.TurnsModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'roles',
        loadChildren: () => import('../pages/roles/roles.module').then(m => m.RolesModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'roles/create',
        loadChildren: () => import('../pages/roles/roles.module').then(m => m.RolesModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'users',
        loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'users/create',
        loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'system-configurations',
        loadChildren: () => import('../pages/system-configurations/system-configurations.module').then(m => m.SystemConfigurationsModule),

      },
      {
        path: 'daily-operations',
        loadChildren: () => import('../pages/daily-operations/daily-operations.module').then(m => m.DailyOperationsModule),
        canActivate: [AuthenticatedGuard],
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class LayoutRoutingModule { }
