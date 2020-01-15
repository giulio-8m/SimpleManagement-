import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { TablesComponent } from './components/tables/tables.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ErrorsService } from './services/errors.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { HeadersService } from './services/headers.service';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CashDeskComponent } from './components/cash-desk/cash-desk.component';
import { StaffComponent } from './components/staff/staff.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponents,
    TablesComponent,
    OrderComponent,
    OrdersComponent,
    CashDeskComponent,
    StaffComponent,
    CheckOutComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    AuthGuardService,
    {
      provide:HTTP_INTERCEPTORS,
        useClass:ErrorsService,
        multi:true 
    },
    {
      provide:HTTP_INTERCEPTORS,
        useClass:HeadersService,
        multi:true 
    }
    


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
