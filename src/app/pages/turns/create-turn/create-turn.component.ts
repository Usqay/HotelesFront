import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Turn } from 'src/app/interfaces/turn';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { TurnsService } from 'src/app/services/turns.service';

@Component({
  selector: 'app-create-turn',
  templateUrl: './create-turn.component.html',
  styleUrls: ['./create-turn.component.scss']
})
export class CreateTurnComponent implements OnInit {

  createSubscription : Subscription = null

  constructor(private alert : AlertService,
    private router : Router,
    private errorService : ErrorService,
    private turnsService : TurnsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.createSubscription != null) this.createSubscription.unsubscribe()
  }

  onSubmit = (turn : Turn) => {
    this.alert.loading()
    this.createSubscription = this.turnsService.create(turn)
    .subscribe(data => {
      this.alert.success('Exito', 'Registro correcto')
      location.reload()
    }, error => {
      this.alert.error('Ooops', this.errorService.make(error.error))
    })
  }

  onCancel(){
    this.router.navigate(['/turns'])
  }
}
