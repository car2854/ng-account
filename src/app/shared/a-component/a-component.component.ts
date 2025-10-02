import { RouterLink } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-a',
  templateUrl: './a-component.component.html',
  styleUrls: ['./a-component.component.css'],
  imports: [RouterLink],
})
export class AComponentComponent implements OnInit {
  @Input({ required: true }) url: string = '';
  @Input({ required: true }) label: string = '';
  constructor() {}
  ngOnInit() {}
}
