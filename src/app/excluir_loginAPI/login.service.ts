import { Injectable } from '@angular/core';
import {GoogleLoginProvider,FacebookLoginProvider,AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private socialAuthService: AuthService) {}
  
  public login(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
      }
    );
  }
}
