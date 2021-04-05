import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rows = {}
  items = {}
  mantenimiento : number =0;
  disponible : number =0;
  ocupadas : number =0;
  private subs = new SubSink();

  constructor(private alert : AlertService,
    private dashboardService : DashboardService,
    private router : Router,
    private roomsService : RoomsService) { }

    config: any;
    gstcState: any;
    colorPrimary = "#f7fafc"
    colorSecondary = "#EF6A01"
    lineChartData: ChartDataSets[] =[

      { data: null, label: 'Total Alquiler' },
    ];

    lineChartLabels: Label[] = null;

    lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    lineChartColors: Color[] = [
      {
       borderColor: 'rgba(239,106,1,.8)',
       backgroundColor: 'rgba(138,221,45,0)',
      },
    ];

    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';



  ngOnInit() {
    //this.getRooms()

    //this.getData();


  }
  ngAfterViewInit() {
    // ...
    this.getData();
  }
  ngOnDestroy(){
    this.subs.unsubscribe();

  }

  private getData(){
    this.subs.add(
      this.dashboardService.data()
      .subscribe((data:any)=>{

        this.lineChartData[0].data= data.line.data;
        this.lineChartLabels = data.line.labels;
        this.mantenimiento = data.mantenimiento;
        this.disponible = data.disponible;
        this.ocupadas = data.ocupada;
      })
    );
  }



}
