import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'sign-in',component:SignInComponent,canActivate:[AuthGuardService]},
  {path:'sign-up',component:SignUpComponent,canActivate:[AuthGuardService]},
  {path:'**',component:HomeComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents=[

  SignInComponent,
  SignUpComponent,
  HomeComponent,

]
