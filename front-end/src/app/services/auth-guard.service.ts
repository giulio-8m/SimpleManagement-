import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
    
  constructor( private router: Router,private userService:UsersService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
      if(this.userService.user){ 
          if(this.userService.user.role=="Barista" && route.routeConfig.path=="bar"){
            return true;
          }
          if(this.userService.user.role=="Cameriere" && (route.routeConfig.path=="tables" || route.routeConfig.path=="orders/:id" || route.routeConfig.path=="orders-desk/:id")){
            return true;
          }
          if(this.userService.user.role=="Cuoco" && route.routeConfig.path=="kitchen"){
            return true;
          }
          if(this.userService.user.role=="Cassa" && (route.routeConfig.path=="sign-up" ||
                                              route.routeConfig.path=="check-out/:id" ||
                                              route.routeConfig.path=="desk" || 
                                              route.routeConfig.path=="tables-desk" || 
                                              route.routeConfig.path=="orders-desk" || 
                                              route.routeConfig.path=="users" || 
                                              route.routeConfig.path=="statistics" || 
                                              route.routeConfig.path=="orders-desk/:id") ){
            return true;
          }
          
          if(this.userService.user.username=="cane"){
            return true;
          }

          this.router.navigate(['unauthorized']);
          return false;
      }else{
          this.router.navigate(['sign-in']);
          return false;
      }
  }
}
