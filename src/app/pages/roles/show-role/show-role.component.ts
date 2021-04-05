import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/shared/interfaces/role';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { RoomCategoriesService } from 'src/app/shared/services/room-categories.service';

@Component({
  selector: 'app-show-role',
  templateUrl: './show-role.component.html',
  styleUrls: ['./show-role.component.scss']
})
export class ShowRoleComponent implements OnInit {

  roleId: string
  role: Role

  paramsSubscription: Subscription = null
  showRoleSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private rolesService: RolesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.roleId = params.id
        this.showRole()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showRoleSubscription != null) this.showRoleSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showRole() {
    this.alert.loading()
    this.showRoleSubscription = this.rolesService.show(this.roleId)
      .subscribe(data => {
        this.role = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/roles'])
      })
  }

  showEditDialog() {
    const dialogRef = this.dialog.open(DialogEditRole, {
      disableClose: true,
      data: {
        roleId: this.roleId,
        role: this.role,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result.reload) {
        this.showRole()
      }
    });
  }
}


@Component({
  selector: 'dialog-edit-role',
  templateUrl: 'edit-role.html',
})
export class DialogEditRole {
  role: Role
  roleId: string

  updateSubscription: Subscription = null

  constructor(private rolesService: RolesService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditRole>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.role = this.data.role
    this.roleId = this.data.roleId
  }

  onSubmit(role: Role) {
    this.alert.loading()
    this.updateSubscription = this.rolesService.update(this.roleId, role)
      .subscribe(data => {
        this.alert.success()
        this.dialogRef.close({
          reload: true
        });
      }, error => {
        this.alert.error('Ooops', 'No se pudo actualizar la categoría de habitación, intentalo nuevamente.')
      })
  }

  ngOnDestroy() {
    if (this.updateSubscription != null) this.updateSubscription.unsubscribe()
  }

  onCancel() {
    this.dialogRef.close({
      reload: false
    });
  }
}
