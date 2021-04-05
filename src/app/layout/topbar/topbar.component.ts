import { Component } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

export class TopbarComponent {

  private subs = new SubSink();

  constructor(public app: LayoutComponent, private router: Router,
    private userService: UserService) {

  }

  logout(e): void {

    e.preventDefault();
    this.subs.add(
      this.userService.logout()
      .subscribe(data => {
        this.router.navigate(['login']);
        //.reload()
        //this.router.navigate(['/user/login'])
      })
    );


  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
