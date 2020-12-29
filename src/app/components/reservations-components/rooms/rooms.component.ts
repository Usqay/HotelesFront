import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AlertService } from 'src/app/services/alert.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { Room } from 'src/app/interfaces/room';
import { Subscription } from 'rxjs';
import { RoomCategory } from 'src/app/interfaces/room-category';
import { RoomCategoriesService } from 'src/app/services/room-categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from 'src/app/interfaces/currency';
import { CurrenciesService } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-reservation-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  animations: [
    trigger('hover', [
      state('hoverIn', style({
        backgroundColor: '#0A5C9E',
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        color: '#fff',
      })),
      state('hoverOut', style({
        backgroundColor: '#ffffff',
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        color: '#2B2B2B',
      })),
      transition('hoverIn => hoverOut', [
        animate('0.25s')
      ]),
      transition('hoverOut => hoverIn', [
        animate('0.1s'),

      ]),
    ]),
    trigger('active', [
      state('active', style({
        backgroundColor: '#0A5C9E',
        color: '#fff',
      })),
      state('inactive', style({
        backgroundColor: '#ffffff',
        color: '#2B2B2B',
      })),
      transition('active => inactive', [
        animate('0.25s')
      ]),
      transition('inactive => active', [
        animate('0.1s'),

      ]),
    ]),
  ]
})
export class RoomsComponent implements OnInit {
  @Output() onAddRoom = new EventEmitter<{ room: Room, priceType: string, priceValue: number, currency: Currency }>();

  rooms: Room[] = []
  filteredRooms: Room[] = []
  currencies: Currency[] = []
  roomCategories: RoomCategory[] = []

  roomsSubscription: Subscription = null
  currenciesSubscription: Subscription = null
  roomCategoriesSubscription: Subscription = null
  dialogSubscription: Subscription = null

  constructor(private alert: AlertService,
    private roomCategoriesService: RoomCategoriesService,
    private currenciesService: CurrenciesService,
    public dialog: MatDialog,
    private roomsService: RoomsService) { }

  ngOnInit() {
    this.getRoomCategories()
    this.getRooms()
    this.getCurrencies()
  }

  ngOnDestroy() {
    if (this.roomsSubscription != null) this.roomsSubscription.unsubscribe()
    if (this.roomCategoriesSubscription != null) this.roomCategoriesSubscription.unsubscribe()
    if (this.dialogSubscription != null) this.dialogSubscription.unsubscribe()
    if (this.currenciesSubscription != null) this.currenciesSubscription.unsubscribe()
  }

  private getRooms() {
    this.alert.loading()
    this.roomsSubscription = this.roomsService.list(null, 1, 9999)
      .subscribe(data => {
        this.rooms = data.data.map(i => {
          return {
            ...i, activeStatus: false
          }
        })
        this.filteredRooms = this.rooms
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
  }

  private getCurrencies() {
    this.alert.loading()
    this.currenciesSubscription = this.currenciesService.list(null, 1, 9999)
      .subscribe(data => {
        this.currencies = data.data
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
  }

  private getRoomCategories() {
    this.alert.loading()
    this.roomCategoriesSubscription = this.roomCategoriesService.list(null, 1, 9999)
      .subscribe(data => {
        this.roomCategories = data.data
        this.roomCategories.unshift({
          name: 'Todo',
          activeState: false,
          id: 0
        })
        this.filterRooms(0)
        this.alert.hide()
      }, error => {
        this.alert.error()
      })
  }

  filterRooms(roomCategoryId) {
    this.roomCategories = this.roomCategories.map(i => {
      const activeState = i.id == roomCategoryId ? true : false
      return {
        ...i,
        activeState: activeState
      }
    })

    if (roomCategoryId == 0) {
      this.filteredRooms = this.rooms
    } else {
      this.filteredRooms = this.rooms.filter(i => {
        return i.room_category_id == roomCategoryId
      })
    }
  }

  showRoomDetail(room: Room) {
    const dialogRef = this.dialog.open(DialogRoomDetail, {
      minWidth: '85vw',
      maxWidth: '85vw',
      data: {
        room: room,
        currencies: this.currencies,
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result.priceValue >= 0) {
        this.onAddRoom.emit({
          room: room,
          priceType: result.priceType,
          priceValue: result.priceValue,
          currency: result.currency,
        })
      }
    });
  }

}

@Component({
  selector: 'dialog-room-detail',
  templateUrl: 'room-detail.html',
  styleUrls: ['./rooms.component.scss'],
})
export class DialogRoomDetail {

  room: Room
  priceType = 'hour'
  priceValue = 0
  currency: Currency
  currencies: Currency[] = []
  customPrice = false

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogRoomDetail>,) {
    this.room = data.room
    this.currencies = data.currencies
    this.currencies.forEach(i => {
      if (i.is_base) this.currency = i
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  setPrice(priceType, priceValue, currency) {
    this.priceType = priceType
    this.priceValue = priceValue
    this.currency = currency
  }

  onAddRoom() {
    this.dialogRef.close({
      priceType: this.priceType,
      priceValue: this.priceValue,
      currency: this.currency
    });
  }
}