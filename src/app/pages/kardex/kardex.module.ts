import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KardexRoutingModule } from './kardex-routing.module';
import { KardexComponent } from './kardex.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [KardexComponent],
  imports: [
    CommonModule,
    SharedModule,
    KardexRoutingModule,
    ReactiveFormsModule,

  ]
})
export class KardexModule { }
