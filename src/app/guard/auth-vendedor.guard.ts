import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { VendedorService } from '../_services/vendedor.service';
@Injectable({
  providedIn: 'root'
})
export class AuthVendedorGuard implements CanActivate {
    constructor(private sVendedor:VendedorService,private router: Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.sVendedor.currentVendedorValue();
      if (currentUser) {
          return true;
      }
      this.router.navigate(['vendedor/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }

}
