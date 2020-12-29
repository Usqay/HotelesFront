import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Service } from 'src/app/interfaces/service';
import { AlertService } from 'src/app/services/alert.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-show-service',
  templateUrl: './show-service.component.html',
  styleUrls: ['./show-service.component.scss']
})
export class ShowServiceComponent implements OnInit {

  serviceId: string
  service: Service

  paramsSubscription: Subscription = null
  showServiceSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.serviceId = params.id
        this.showService()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showServiceSubscription != null) this.showServiceSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showService() {
    this.alert.loading()
    this.showServiceSubscription = this.servicesService.show(this.serviceId)
      .subscribe(data => {
        this.service = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/services'])
      })
  }

  showEditDialog(component) {
    const dialogRef = this.dialog.open(DialogEditService, {
      disableClose : true,
      data : {
        serviceId : this.serviceId,
        service : this.service,
        component : component
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if(result && result.reload){
        this.showService()
      }
    });
  }

}

@Component({
  selector: 'dialog-edit-service',
  templateUrl: 'edit-service.html',
})
export class DialogEditService {
  service: Service
  serviceId: string
  component : string
  reload = false

  updateSubscription: Subscription = null

  constructor(private servicesService: ServicesService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditService>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.service = this.data.service
    this.serviceId = this.data.serviceId
    this.component = this.data.component
  }

  onSubmit(service: any) {
    this.alert.loading()
    this.updateSubscription = this.servicesService.update(this.serviceId, service)
    .subscribe(data => {
      this.alert.success()
      this.dialogRef.close({
        reload: true
      });
    }, error => {
      this.alert.error('Ooops', 'No se pudo actualizar el servicio, intentalo nuevamente.')
    })
  }

  ngOnDestroy() {
    if (this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel() {
    this.dialogRef.close({
      reload: this.reload
    });
  }
}