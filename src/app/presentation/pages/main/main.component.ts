import { Component, OnInit, signal } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { LucideAngularModule } from 'lucide-angular';
import { SIDEBAR_ITEM } from "../../layout/sidebar-item";
import { IconPipe } from "../../pipe/icon/icon.pipe";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [RouterOutlet, LucideAngularModule, RouterLink, RouterLinkActive, IconPipe],
})
export class MainComponent implements OnInit {
  public title = signal('');
  public sidebarItems = SIDEBAR_ITEM;

  constructor() {}

  ngOnInit(): void {}
}
