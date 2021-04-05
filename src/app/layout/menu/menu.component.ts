import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { LayoutComponent } from '../layout.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  model: any[];

  constructor(public app: LayoutComponent) {}

  ngOnInit() {
    this.model = [
      { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
      {
        label: 'Reservaciones',
        icon: 'fa fa-fw fa-table',
        items: [
          {label: 'Listar', icon: 'fa fa-fw fa-list', routerLink: ['/reservations'], permission : 'create-reservations'},
          {label: 'Crear', icon: 'fa fa-fw fa-list', routerLink: ['/reservations/create'], permission : 'create-reservations'}
        ],
      },

      {
        label: 'Ventas',
        icon: 'fa fa-fw fa-shopping-cart',
        items: [
          {label: 'Listar', icon: 'fa fa-fw fa-list', routerLink: ['/sales'], permission : 'read-sales'},
          {label: 'Crear', icon: 'fa fa-fw fa-list', routerLink: ['/sales/create'], permission : 'create-sales'},
          {label: 'Comprobantes', icon: 'fa fa-fw fa-list', routerLink: ['/electronic-vouchers'], permission : 'read-electronic-vouchers'}
        ],
      },

      {
        label: 'Habitaciones',
        icon: 'fa fa-fw fa-bed',
        items: [
          {label: 'Listar habitación', icon: 'fa fa-fw fa-list', routerLink: ['/rooms'], permission : 'read-rooms'},
          {label: 'Crear habitación', icon: 'fa fa-fw fa-list', routerLink: ['/rooms/create'], permission : 'create-rooms'},
          {
            label: 'Listar tipo habitación',
            icon: 'fa fa-fw fa-address-card-o',
            routerLink: ['/room-categories'],
            permission : 'read-room-categories'
          },
          {
            label: 'Crear tipo habitación',
            icon: 'fa fa-fw fa-list',
            routerLink: ['/room-categories/create'],
            permission : 'create-room-categories'
          },
          {
            label: 'Listar estado habitación',
            icon: 'fa fa-fw fa-address-card-o',
            routerLink: ['/room-statuses'],
            permission : 'read-room-statuses'
          },
          {
            label: 'Crear estado habitación',
            icon: 'fa fa-fw fa-list',
            routerLink: ['/room-statuses/create'],
            permission : 'create-room-statuses'
          },
        ],
      },
      {
        label: 'Cajas',
        icon: 'fa fa-fw fa-usd',
        items: [
          {label: 'Listar', icon: 'fa fa-fw fa-list', routerLink: ['/cash-registers'], permission :'read-cash-registers'},
          {label: 'Crear', icon: 'fa fa-fw fa-list', routerLink: ['/cash-registers/create'], permission : 'create-cash-registers'},
          {label: 'Movimientos', icon: 'fa fa-fw fa-list', routerLink: ['/cash-register-movements'], permission : 'read-cash-register-movements'},

        ],
      },

      {
        label: 'Almacen',
        icon: 'fa fa-fw fa-archive',
        items: [
          {
            label: 'Almacenes',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/store-houses'],
                permission : 'read-store-houses'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/store-houses/create'],
                permission : 'create-store-houses'
              },
            ],
          },
          {
            label: 'Productos',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/products'],
                permission : 'read-products'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/products/create'],
                permission : 'create-products'
              },

            ],
          },
          {
            label: 'Servicios',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/services'],
                permission : 'read-services'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/services/create'],
                permission : 'create-services'
              },

            ],
          },
          {
            label: 'Movimientos',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/store-house-movements'],
                permission : 'read-store-house-movements'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/store-house-movements/create'],
                permission : 'create-store-house-movements'
              },

            ],
          },
          {label: 'Kardex', icon: 'fa fa-fw fa-list', routerLink: ['/kardex'], permission : 'read-kardex'},
        ],
      },
      {
        label: 'Reportes',
        icon: 'fa fa-fw fa-table',
        items: [
          {
            label: 'Reporte de habitaciones', icon: 'fa fa-fw fa-list',
            routerLink: ['/reports/rooms'], permission : 'read-report-rooms'
          },
          {
            label: 'Reporte de reservaciones', icon: 'fa fa-fw fa-list',
            routerLink: ['/reports/reservations'], permission : 'read-report-reservations'
          },
          {
            label: 'Reporte de ventas', icon: 'fa fa-fw fa-list',
            routerLink: ['/reports/sales'], permission : 'read-report-sales'
          },
          {
            label: 'Cuadre diario', icon: 'fa fa-fw fa-list',
            routerLink: ['/reports/dayli'], permission : 'read-report-dayli'
          },

        ],
      },
      {
        label: 'Configuración',
        icon: 'fa fa-fw fa-gear',
        items: [
          {
            label: 'Monedas',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/currencies'],
                permission : 'read-currencies'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/currencies/create'],
                permission : 'create-currencies'
              },
            ],
          },
          {
            label: 'Impresoras',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/printers'],
                permission : 'read-printers'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/printers/create'],
                permission : 'create-printers'
              },

            ],
          },
          {
            label: 'Turnos',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/turns'],
                permission : 'read-turns'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/turns/create'],
                permission : 'create-turns'
              },

            ],
          },
          {
            label: 'Roles y permisos',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/roles'],
                permission : 'read-roles'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/roles/create'],
                permission : 'create-roles'
              },

            ],
          },
          {
            label: 'Usuarios',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Listar',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/users'],
                permission : 'read-users'
              },
              {
                label: 'Crear',
                icon: 'fa fa-fw fa-list',
                routerLink: ['/users/create'],
                permission : 'create-users'
              },

            ],
          },
          {
            label: 'Configuraciones',
            icon: 'fa fa-fw fa-list',
            routerLink: ['/system-configurations'],
            permission : 'read-system-configurations'
          },
          {
            label: 'Op. Diarias',
            icon: 'fa fa-fw fa-list',
            items: [
              {
                label: 'Abrir turno',
                icon: 'fa fa-fw fa-address-card-o',
                routerLink: ['/daily-operations/turn-opening']
              }

            ]
          },


        ],
      },


    ];
  }
}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-submenu]',
  /* tslint:enable:component-selector */
  template: `
    <ng-template
      ngFor
      let-child
      let-i="index"
      [ngForOf]="root ? item : item.items"
    >
      <li
        [ngClass]="{ 'active-menuitem': isActive(i) }"
        [class]="child.badgeStyleClass"
        *ngIf="child.visible === false ? false : true"
      >
        <a
          [href]="child.url || '#'"
          (click)="itemClick($event, child, i)"
          *ngIf="!child.routerLink"
          [attr.tabindex]="!visible ? '-1' : null"
          [attr.target]="child.target"
          (mouseenter)="hover = true"
          (mouseleave)="hover = false"
        >
          <i [ngClass]="child.icon"></i>
          <span>{{ child.label }}</span>
          <i
            class="fa fa-fw fa-angle-down ui-menuitem-toggler"
            *ngIf="child.items"
          ></i>
          <span class="menuitem-badge" *ngIf="child.badge">{{
            child.badge
          }}</span>
        </a>

        <a
          (click)="itemClick($event, child, i)"
          *ngIf="child.routerLink"
          [routerLink]="child.routerLink"
          routerLinkActive="active-menuitem-routerlink"
          [routerLinkActiveOptions]="{ exact: true }"
          [attr.tabindex]="!visible ? '-1' : null"
          [attr.target]="child.target"
          (mouseenter)="hover = true"
          (mouseleave)="hover = false"
        >
          <i [ngClass]="child.icon"></i>
          <span>{{ child.label }}</span>
          <i
            class="fa fa-fw fa-angle-down ui-menuitem-toggler"
            *ngIf="child.items"
          ></i>
          <span class="menuitem-badge" *ngIf="child.badge">{{
            child.badge
          }}</span>
        </a>
        <ul
          app-submenu
          [item]="child"
          *ngIf="child.items"
          [@children]="isActive(i) ? 'visible' : 'hidden'"
          [visible]="isActive(i)"
          [parentActive]="isActive(i)"
        ></ul>
      </li>
    </ng-template>
  `,
  animations: [
    trigger('children', [
      state(
        'hidden',
        style({
          height: '0px',
        }),
      ),
      state(
        'visible',
        style({
          height: '*',
        }),
      ),
      transition(
        'visible => hidden',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'),
      ),
      transition(
        'hidden => visible',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'),
      ),
    ]),
  ],
})
export class AppSubMenuComponent {
  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  activeIndex: number;

  hover: boolean;

  _parentActive: boolean;

  constructor(
    public app: LayoutComponent,
    public router: Router,
    public location: Location,
  ) {}

  itemClick(event: Event, item: MenuItem, index: number) {
    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    this.activeIndex = this.activeIndex === index ? null : index;

    // execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }

    // hide menu
    if (!item.items && (this.app.overlay || !this.app.isDesktop())) {
      this.app.sidebarActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  unsubscribe(item: any) {
    if (item.eventEmitter) {
      item.eventEmitter.unsubscribe();
    }

    if (item.items) {
      for (const childItem of item.items) {
        this.unsubscribe(childItem);
      }
    }
  }

  @Input() get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
      this.activeIndex = null;
    }
  }
}
