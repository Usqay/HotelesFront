import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { CashRegister } from 'src/app/shared/interfaces/cash-register';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CashRegistersService } from 'src/app/shared/services/cash-registers.service';

@Component({
  selector: 'app-list-cash-registers',
  templateUrl: './list-cash-registers.component.html',
  styleUrls: ['./list-cash-registers.component.scss']
})
export class ListCashRegistersComponent implements OnInit {

  items: CashRegister[] = []
  totalItems = 0
  page = 1
  paginate = 25
  private subs = new SubSink();
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
      key: 'location',
      label: 'Ubicación',
      type: 'string',
    },
    {
      key : 'is_base',
      label : 'Base',
      type : 'toggle',
      toggleEvent : (id, value) => {
        this.onToggleBase(id, value)
      }
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

  constructor(private cashRegistersService: CashRegistersService,
    private router: Router,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.listItems()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  listItems(q = null) {
    this.subs.add(
      this.cashRegistersService.list(q, this.page, this.paginate)
        .subscribe(data => {
          this.items = data.data
          this.totalItems = data.meta.total

        }, error => {
          this.alert.error('Ooops', 'No se pudo cargar la información');
        })
    );
  }

  onChangePage(e) {
    this.page = e.pageIndex + 1
    this.paginate = e.pageSize
    this.listItems()
  }

  onShow(itemId) {
    this.router.navigate(['/cash-registers/show', itemId]);
  }

  onDelete(itemId) {
    this.alert.question('Se eliminará este registro')
      .then(result => {
        if (result.value) {
          this.subs.add(
            this.cashRegistersService.delete(itemId)
              .subscribe(data => {
                this.listItems()
              }, error => {
                this.alert.error('Ooops', 'No se pudo eliminar este registro')
              })
          );
        }
      })
  }

  onToggleBase(itemId, value){
    const cashRegister : CashRegister = {
      is_base : value
    }
    this.subs.add(
      this.cashRegistersService.update(itemId, cashRegister)
      .subscribe(data => {
        this.listItems()
      }, error => {
        this.alert.error('Ooops', 'No se pudo actualizar este registro')
      })
    );
  }
}
