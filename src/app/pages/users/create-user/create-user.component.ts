import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private usersService : UsersService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (user : User) => {
    this.alert.loading()
    this.createSubscription = this.usersService.create(user)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/users'])
  }
}
