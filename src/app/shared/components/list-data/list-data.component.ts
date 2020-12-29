import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Currency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {
  @Input() cols : any[] = []
  @Input() items : Currency[] = []
  @Input() totalItems = 0
  @Input() pageSizeOptions : any[] = [5, 10, 25, 100]
  @Output() pageEvent = new EventEmitter<PageEvent>()
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = []
  
  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns = this.buildDisplayedColumns()
  }

  buildDisplayedColumns() : string[]{
    return this.cols.map(i => i.key);
  }

  //Paginator

  onChangePage(e){
    this.pageEvent.emit(e)
  }

}