import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChartOptions } from 'src/app/interfaces/chart-options';
import { Currency } from 'src/app/interfaces/currency';
import { AlertService } from 'src/app/services/alert.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';
import { MONTHS } from 'src/app/shared/data/dates';

const Months = MONTHS;

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.scss']
})
export class ReportSalesComponent implements OnInit {
  public salesHistoryChartOptions: Partial<ChartOptions>;
  public productsTopChartOptions: Partial<ChartOptions>;
  public servicesTopChartOptions: Partial<ChartOptions>;
  public salesPerPaymentMethodOptions: Partial<ChartOptions>;

  filtersForm: FormGroup
  baseCurrency: Currency
  colorPrimary = "#0F4B81"
  colorSecondary = "#EF6A01"

  filtersListenerSubscription: Subscription = null
  getReportSubscription: Subscription = null

  constructor(private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    private userService: UserService,
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
    this.getReportSubscription = this.reportsService.sales(formData)
      .subscribe(data => {
        this.makeSalesHistoryChart(data)
        this.makeTopProductsChart(data)
        this.makeTopServicesChart(data)
        this.makeSalesPerPaymentMethodOptionsChart(data)
        this.alert.hide()
      }, error => this.alert.error())
  }

  makeSalesHistoryChart(data) {
    this.salesHistoryChartOptions = {
      series: [
        {
          name: "Total",
          data: data.sales.map(i => Number(i.total))
        }
      ],
      chart: {
        height: 300,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `${this.baseCurrency.symbol} ${val}`;
        }.bind(this),
      },
      xaxis: {
        categories: data.sales.map(i => {
          if (data.group_by == 'month') {
            return Months[Number(i.label)]
          }
          return i.label
        }),
        position: "bottom",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      fill: {
        type: "solid",
        colors: [this.colorPrimary],
        opacity: .75
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return `${this.baseCurrency.symbol} ${val}`;
          }.bind(this)
        }
      },
    };
  }

  makeTopProductsChart(data) {
    this.productsTopChartOptions = {
      series: data.top_products.map(i => Number(i.sales)),
      chart: {
        height: 312,
        type: "pie"
      },
      labels: data.top_products.map(i => i.product),
      theme: {
        monochrome: {
          enabled: true,
          color: this.colorPrimary,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  makeTopServicesChart(data) {
    this.servicesTopChartOptions = {
      series: data.top_services.map(i => Number(i.sales)),
      chart: {
        height: 312,
        type: "pie"
      },
      labels: data.top_services.map(i => i.service),
      theme: {
        monochrome: {
          enabled: true,
          color: this.colorSecondary,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  makeSalesPerPaymentMethodOptionsChart(data) {
    this.salesPerPaymentMethodOptions = {
      series: data.sales_per_payment_method.map(i => Number(i.total)),
      chart: {
        height: 315,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ['#EF6A01', '#F17D22', "#F39143", "#F5A464", '#F7B785', '#FFAA62'],
      labels: data.sales_per_payment_method.map(i => i.payment_method),
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + this.baseCurrency.symbol + opts.w.globals.series[opts.seriesIndex];
        }.bind(this),
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }
}
