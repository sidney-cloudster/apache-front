import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })

// ************************************* EXCLUIR FUTURAMENTE *****************************************
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sUser:UserService,
        // private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.sUser.currentUserValue;
        if (currentUser) {
            console.log("auth.guard.ts - OK");
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}