import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TablesComponent } from './components/tables/tables.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CashDeskComponent } from './components/cash-desk/cash-desk.component';
import { StaffComponent } from './components/staff/staff.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TableOrdersComponent } from './components/table-orders/table-orders.component';


const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'table-orders/:tableCode',component:TableOrdersComponent,canActivate:[AuthGuardService]},
  {path:'statistics',component:StatisticsComponent,canActivate:[AuthGuardService]},
  {path:'check-out/:tableCode/:clients',component:CheckOutComponent,canActivate:[AuthGuardService]},
  {path:'staff',component:StaffComponent,canActivate:[AuthGuardService]},
  {path:'cash-desk',component:CashDeskComponent,canActivate:[AuthGuardService]},
  {path:'bar',component:OrdersComponent,canActivate:[AuthGuardService]},
  {path:'kitchen',component:OrdersComponent,canActivate:[AuthGuardService]},
  {path:'order/:tableCode/:clients',component:OrderComponent,canActivate:[AuthGuardService]},
  {path:'tables',component:TablesComponent,canActivate:[AuthGuardService]},
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up',component:SignUpComponent,canActivate:[AuthGuardService]},
  {path:'**',component:HomeComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents=[
  TableOrdersComponent,
  StatisticsComponent,
  CheckOutComponent,
  StaffComponent,
  CashDeskComponent,
  OrdersComponent,
  OrderComponent,
  TablesComponent,
  SignInComponent,
  SignUpComponent,
  HomeComponent,

]
