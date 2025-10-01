import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { LucideAngularModule, HouseIcon, UsersIcon, BookMinusIcon, SettingsIcon, LogOutIcon, LogInIcon } from 'lucide-angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [RouterOutlet, LucideAngularModule, RouterLink, RouterLinkActive],
})
export class MainComponent implements OnInit {
  readonly HouseIcon = HouseIcon;
  readonly UsersIcon = UsersIcon;
  readonly BookMinusIcon = BookMinusIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly LogInIcon = LogInIcon;

  constructor() {}

  ngOnInit(): void {}
}
