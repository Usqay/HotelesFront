import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  userId: string
  user: User

  paramsSubscription: Subscription = null
  showUserSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        this.userId = params.id
        this.showUser()
      })
  }

  ngOnDestroy() {
    if (this.paramsSubscription != null) this.paramsSubscription.unsubscribe()
    if (this.showUserSubscription != null) this.showUserSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
  }

  showUser() {
    this.alert.loading()
    this.showUserSubscription = this.usersService.show(this.userId)
      .subscribe(data => {
        this.user = data
        this.alert.hide()
      }, error => {
        this.alert.error()
        this.router.navigate(['/users'])
      })
  }

  showEditDialog() {
    const dialogRef = this.dialog.open(DialogEditUser, {
      disableClose: true,
      data: {
        userId: this.userId,
        user: this.user,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result.reload) {
        this.showUser()
      }
    });
  }
}

@Component({
  selector: 'dialog-edit-user',
  templateUrl: 'edit-user.html',
})
export class DialogEditUser {
  user: User
  userId: string

  updateSubscription: Subscription = null

  constructor(private usersService: UsersService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<DialogEditUser>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.user = this.data.user
    this.userId = this.data.userId
  }

  onSubmit(user: User) {
    this.alert.loading()
    this.updateSubscription = this.usersService.update(this.userId, user)
      .subscribe(data => {
        this.alert.success()
        this.dialogRef.close({
          reload: true
        });
      }, error => {
        this.alert.error('Ooops', 'No se pudo actualizar el usuario, intentalo nuevamente.')
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
