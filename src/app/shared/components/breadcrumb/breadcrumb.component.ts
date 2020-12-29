import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() title: string;
  @Input() items: any[];
  @Input() active_item: string;
  @Input() back_button: boolean = false;
  @Input() back_route: string = '/';

  constructor(private router : Router) {
  }

  ngOnInit() {  }

}
