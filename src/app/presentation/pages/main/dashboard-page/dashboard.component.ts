import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card-component/card.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CardComponent],
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}
