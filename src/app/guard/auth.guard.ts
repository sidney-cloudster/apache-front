import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private router: Router,private sUser:UserService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.sUser.currentUserValue;
        if (currentUser) {
            return true;
        }
        this.router.navigate(['user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
  
}

