import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";

@Component({
  selector: 'app-account-chart',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.css'],
  imports: [CardComponent]
})
export class AccountChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
