import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
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
  private router = inject(Router);
  public title = signal('');
  public sidebarItems = SIDEBAR_ITEM;

  constructor() {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('dashboard')) {
      this.title.set('Dashboard');
    } else if (['users', 'user'].some((r) => url.includes(r))) {
      this.title.set('Users');
    } else if (['accounts', 'account'].some((r) => url.includes(r))) {
      this.title.set('Accounts');
    }
  }
}
