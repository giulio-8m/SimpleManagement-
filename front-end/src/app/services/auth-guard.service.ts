import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
    
  constructor( private router: Router,private userService:UsersService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.userService.user){ 
          if(this.userService.user.role=="Barista" && route.routeConfig.path=="bar"){
            return true;
          }
          if(this.userService.user.role=="Cuoco" && route.routeConfig.path=="kitchen"){
            return true;
          }
          if(this.userService.user.role=="Cameriere" && (route.routeConfig.path=="tables" || route.routeConfig.path=="table-orders/:tableCode" ||route.routeConfig.path=='order/:tableCode/:clients')){
            return true;
          }

          if(this.userService.user.role=="Cassa" && (route.routeConfig.path=="sign-up" ||
                                              route.routeConfig.path=='check-out/:tableCode/:clients' ||
                                              route.routeConfig.path=="cash-desk" || 
                                              route.routeConfig.path=="tables" || 
                                              route.routeConfig.path=="table-orders/:tableCode" ||
                                              route.routeConfig.path=="bar" || 
                                              route.routeConfig.path=="kitchen" ||
                                              route.routeConfig.path=="staff" || 
                                              route.routeConfig.path=="statistics") ){
            return true;
          }
          if(this.userService.user && route.routeConfig.path==''){
            if(this.userService.user.role=="Cassa"){
              this.router.navigate(['cash-desk']);
              return false;
            }else if(this.userService.user.role=="Barista"){
              this.router.navigate(['bar']);
              return false;
            }else if(this.userService.user.role=="Cuoco"){
              this.router.navigate(['kitchen']);
              return false;
            }else if(this.userService.user.role=="Cameriere"){
              this.router.navigate(['tables']);
              return false;
            }else{
              return true;
            }
          }

          if(route.routeConfig.path=="**"){
            return true;
          }

          return false;
      }else{

          this.router.navigate(['sign-in']);
          return false;
      }
  }
}
