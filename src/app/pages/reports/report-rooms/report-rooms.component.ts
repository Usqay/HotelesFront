import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChartOptions } from 'src/app/shared/interfaces/chart-options';
import { Currency } from 'src/app/shared/interfaces/currency';
import { Room } from 'src/app/shared/interfaces/room';
import { RoomCategory } from 'src/app/shared/interfaces/room-category';
import { RoomStatus } from 'src/app/shared/interfaces/room-status';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ReportsService } from 'src/app/shared/services/reports.service';
import { RoomCategoriesService } from 'src/app/shared/services/room-categories.service';
import { RoomStatusesService } from 'src/app/shared/services/room-statuses.service';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-report-rooms',
  templateUrl: './report-rooms.component.html',
  styleUrls: ['./report-rooms.component.scss']
})
export class ReportRoomsComponent implements OnInit {
  public topRoomsChartOptions: Partial<ChartOptions>;
  public incomePerRoomChartOptions: Partial<ChartOptions>;

  filtersForm: FormGroup
  rooms: Room[] = []
  filteredRooms: Room[] = []
  roomCategories: RoomCategory[] = []
  roomStatuses: RoomStatus[] = []
  baseCurrency : Currency = null

  colorPrimary = "#0F4B81"
  colorSecondary = "#EF6A01"

  getRoomsSubscription: Subscription = null
  getRoomCategoriesSubscription: Subscription = null
  getRoomStatusesSubscription: Subscription = null
  getReportSubscription: Subscription = null
  filtersListenerSubscription: Subscription = null

  constructor(private formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private roomCategoriesService: RoomCategoriesService,
    private roomStatusesService: RoomStatusesService,
    private reportsService: ReportsService,
    private userService : UserService,
    private alert: AlertService) {

  }

  ngOnInit(): void {
    this.baseCurrency = this.userService.enviroment('base_currency')
    this.createFiltersForm()
    this.getRooms()
    this.getRoomCategories()
    this.getRoomStatuses()
  }

  ngOnDestroy() {
    if (this.getRoomsSubscription != null) this.getRoomsSubscription.unsubscribe()
    if (this.filtersListenerSubscription != null) this.filtersListenerSubscription.unsubscribe()
    if (this.getReportSubscription != null) this.getReportSubscription.unsubscribe()
    if (this.getRoomCategoriesSubscription != null) this.getRoomCategoriesSubscription.unsubscribe()
    if (this.getRoomStatusesSubscription != null) this.getRoomStatusesSubscription.unsubscribe()
  }

  createFiltersForm() {
    const startDate = new Date()
    startDate.setDate(1)
    this.filtersForm = this.formBuilder.group({
      start_date: this.formBuilder.control(startDate, Validators.required),
      end_date: this.formBuilder.control(new Date(), Validators.required),
      room_id: this.formBuilder.control(0, Validators.required),
      room_category_id: this.formBuilder.control(0, Validators.required),
    })

    this.filtersListenerSubscription = this.filtersForm.valueChanges.subscribe(formData => {
      this.getReport(formData)
    })

    this.getReport(this.filtersForm.value)
  }

  private getRooms() {
    this.alert.loading()
    this.getRoomsSubscription = this.roomsService.list(null, 1, 9999)
      .subscribe(data => {
        this.rooms = data.data
        this.filteredRooms = data.data
        this.alert.hide()
      }, error => this.alert.error())
  }

  private getRoomCategories() {
    this.alert.loading()
    this.getRoomCategoriesSubscription = this.roomCategoriesService.list(null, 1, 999)
      .subscribe(data => {
        this.roomCategories = data.data
        this.alert.hide()
      }, error => this.alert.error())
  }

  private getRoomStatuses() {
    this.alert.loading()
    this.getRoomStatusesSubscription = this.roomStatusesService.list(null, 1, 999)
      .subscribe(data => {
        this.roomStatuses = data.data
        this.alert.hide()
      }, error => this.alert.error())
  }

  filterRooms(categoryId) {
    if (categoryId != 0) this.filteredRooms = this.rooms.filter(i => i.room_category_id == categoryId)
    else this.filteredRooms = this.rooms
  }

  getReport(formData) {
    formData.start_date.setHours(0)
    formData.end_date.setHours(23, 59)
    formData.start_date = formData.start_date.toLocaleString()
    formData.end_date = formData.end_date.toLocaleString()
    this.alert.loading()
    this.getReportSubscription = this.reportsService.rooms(formData)
      .subscribe(data => {
        this.buildTopRooms(data)
        this.buildIncomePerRoom(data)
        this.alert.hide()
      }, error => this.alert.error())
  }

  buildTopRooms(data) {
    this.topRoomsChartOptions = {
      series: data.room_reservations.map(i => i.total),
      chart: {
        height: 312,
        type: "pie"
      },
      labels: data.room_reservations.map(i => `Hab. ${i.room}`),
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

  buildIncomePerRoom(data) {
    this.incomePerRoomChartOptions = {
      series: [
        {
          name: "Total",
          data: data.room_totals.map(i => i.total)
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
        categories: data.room_reservations.map(i => `Hab. ${i.room}`),
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
        colors : [this.colorPrimary],
        opacity : .75
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

  countRoomsByStatusId(statusId){
    return this.filteredRooms.filter(i => i.room_status_id == statusId).length
  }
}
