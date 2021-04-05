import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/shared/interfaces/role';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {

  items: Role[] = []
  totalItems = 0
  page = 1
  paginate = 25
  itemsSubscription: Subscription = null
  itemDeleteSubscription: Subscription = null
  itemUpdateSubscription: Subscription = null

  columns = [
    {
      key: 'id',
      label: 'ID',
      type: 'string',
    },
    {
      key: 'name',
      label: 'Nombre',
      type: 'string',
    },
    {
      key: 'options',
      label: '',
      type: 'buttons',
      buttons: [
        {
          icon: 'add',
          tooltip: 'Detalle',
          click: (value) => {
            this.onShow(value)
          }
        },
        {
          icon: 'delete',
          tooltip: 'Eliminar',
          click: (value) => {
            this.onDelete(value)
          }
        }
      ]
    }
  ];

  constructor(private rolesService: RolesService,
    private router: Router,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.listItems()
  }

  ngOnDestroy() {
    if (this.itemsSubscription != null) this.itemsSubscription.unsubscribe()
    if (this.itemDeleteSubscription != null) this.itemDeleteSubscription.unsubscribe()
    if (this.itemUpdateSubscription != null) this.itemUpdateSubscription.unsubscribe()
  }

  listItems(q = null) {
    this.alert.loading()
    this.itemsSubscription = this.rolesService.list(q, this.page, this.paginate)
      .subscribe(data => {
        this.items = data.data
        this.totalItems = data.meta.total
        this.alert.hide()
      }, error => {
        this.alert.error('Ooops', 'No se pudo cargar la información');
      })
  }

  onChangePage(e) {
    this.page = e.pageIndex + 1
    this.paginate = e.pageSize
    this.listItems()
  }

  onShow(itemId) {
    this.router.navigate(['/roles/show', itemId]);
  }

  onDelete(itemId) {
    this.alert.question('Se eliminará este registro')
      .then(result => {
        if (result.value) {
          this.alert.loading()
          this.itemDeleteSubscription = this.rolesService.delete(itemId)
            .subscribe(data => {
              this.listItems()
            }, error => {
              this.alert.error('Ooops', 'No se pudo eliminar este registro')
            })
        }
      })
  }
}
