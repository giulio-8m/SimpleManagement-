import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AuthGuardService } from './services/auth-guard.service';
import { ErrorsService } from './services/errors.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { HeadersService } from './services/headers.service';

import { ToastsComponent } from './components/toasts/toasts.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutingComponents, 
    ToastsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'toast-top-right'})
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
