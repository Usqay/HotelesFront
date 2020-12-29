import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChartOptions } from 'src/app/interfaces/chart-options';
import { Currency } from 'src/app/interfaces/currency';
import { AlertService } from 'src/app/services/alert.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';
import { MONTHS } from 'src/app/shared/data/dates';

const Months = MONTHS;

@Component({
  selector: 'app-report-reservations',
  templateUrl: './report-reservations.component.html',
  styleUrls: ['./report-reservations.component.scss']
})
export class ReportReservationsComponent implements OnInit {
  public reservationsHistoryOptions: Partial<ChartOptions>;

  filtersForm: FormGroup
  baseCurrency : Currency

  filtersListenerSubscription: Subscription = null
  getReportSubscription: Subscription = null

  constructor(private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    private userService : UserService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.baseCurrency = this.userService.enviroment('base_currency')
    this.createFiltersForm()
  }

  ngOnDestroy() {
    if (this.filtersListenerSubscription != null) this.filtersListenerSubscription.unsubscribe()
    if (this.getReportSubscription != null) this.getReportSubscription.unsubscribe()
  }

  createFiltersForm() {
    const startDate = new Date()
    startDate.setDate(1)
    this.filtersForm = this.formBuilder.group({
      start_date: this.formBuilder.control(startDate, Validators.required),
      end_date: this.formBuilder.control(new Date(), Validators.required),
    })

    this.filtersListenerSubscription = this.filtersForm.valueChanges.subscribe(formData => {
      this.getReport(formData)
    })

    this.getReport(this.filtersForm.value)
  }

  getReport(formData) {
    this.alert.loading()
    formData.start_date.setHours(0)
    formData.end_date.setHours(23, 59)
    formData.start_date = formData.start_date.toLocaleString()
    formData.end_date = formData.end_date.toLocaleString()
    this.getReportSubscription = this.reportsService.reservations(formData)
      .subscribe(data => {
        this.makeReservationsHistoryChart(data)
        this.alert.hide()
      }, error => this.alert.error())
  }

  makeReservationsHistoryChart(data) {
    this.reservationsHistoryOptions = {
      series: [
        {
          name: "Cantidad",
          type: "column",
          data: data.reservations.map(i => Number(i.reservations)),
          color: "#0F4B81"
        },
        {
          name: "Monto",
          type: "line",
          data: data.reservations.map(i => Number(i.total)),
          color: "#EF6A01"
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
        }
      },
      stroke: {
        width: [0, 4]
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: (val) => this.baseCurrency.symbol + val
      },
      labels: data.reservations.map(i => {
        if (data.group_by == 'month') {
          return Months[Number(i.label)]
        }
        return i.label
      }),
      xaxis: {
        type: "category"
      },
      yaxis: [
        {
          title: {
            text: "Cantidad de reservaciones"
          }
        },
        {
          opposite: true,
          title: {
            text: "Monto por reservaciones"
          }
        }
      ],
    };
  }

}
