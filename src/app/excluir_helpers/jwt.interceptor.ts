import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequisicoesService } from '../_services/requisicoes.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private req: RequisicoesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor");
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(this.localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}