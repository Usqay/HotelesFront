import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor} from '../helpers/jwt.interceptor'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChartsModule } from 'ng2-charts';
import { ListDataComponent } from './components/list-data/list-data.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
// Directives
import { ShowOptionsDirective } from './directives/show-options.directive';
import { DisableKeyPressDirective } from './directives/disable-key-press.directive';
import { OnlyAlphabetsDirective } from './directives/only-alphabets.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';



@NgModule({
  declarations: [
    ListDataComponent,

    ShowOptionsDirective,
    DisableKeyPressDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
  ],
  entryComponents: [  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollPanelModule,
    ChartsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatChipsModule,
    MatStepperModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatPaginatorModule,
    MatButtonToggleModule,


  ],
  exports :[
    FormsModule,
    ReactiveFormsModule,
    ScrollPanelModule,
    ChartsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatChipsModule,
    MatStepperModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    ListDataComponent,
    ShowOptionsDirective,
    DisableKeyPressDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,


  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers :[
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
       
        //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ]
    };
  }
 }
