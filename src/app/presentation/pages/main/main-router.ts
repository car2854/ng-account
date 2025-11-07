import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard-page/dashboard.component";
import { MainComponent } from "./main.component";
import { UsersComponent } from "./user-page/users/users.component";
import { AccountsComponent } from "./account-page/accounts/accounts.component";
import { UserComponent } from "./user-page/user/user.component";
import { AccountComponent } from "./account-page/account/account.component";
import { authGuard } from "../../guards/auth-guard";
import { UserInfoComponent } from "./user-page/user-info/user-info.component";
import { AccountChartComponent } from "./account-page/account-chart/account-chart.component";
import { AccountTransactionsComponent } from "./account-page/account-transactions/account-transactions.component";
import { AccountInfoComponent } from "./account-page/account-info/account-info.component";

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user', component: UserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'user-info/:id', component: UserInfoComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'account/:id', component: AccountComponent },
      { path: 'account-transactions/:id', component: AccountTransactionsComponent },
      { path: 'account-info/:id', component: AccountInfoComponent },
      { path: 'account-chart/:id', component: AccountChartComponent },
    ],
  },
];
