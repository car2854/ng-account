import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard-page/dashboard.component";
import { MainComponent } from "./main.component";
import { UsersComponent } from "./user-page/users/users.component";
import { AccountsComponent } from "./account-page/accounts/accounts.component";
import { UserComponent } from "./user-page/user/user.component";
import { AccountComponent } from "./account-page/account/account.component";
import { authGuard } from "../../guards/auth-guard";

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user', component: UserComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
];
