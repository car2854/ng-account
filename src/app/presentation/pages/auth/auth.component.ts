import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [RouterOutlet]
})
export class AuthComponent implements OnInit{
  constructor(){}

  ngOnInit(): void {}

}
