import { Component, ContentChild, Input, OnInit, signal, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input({required: true}) title = ''

  constructor() { }

  ngOnInit() {
  }


}
