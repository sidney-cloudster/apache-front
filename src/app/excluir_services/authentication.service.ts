import { Injectable , Inject} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from '../../environments/environment';
import { User } from '../models/user';;
import { LOCAL_STORAGE } from '@ng-toolkit/universal'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // public header = new HttpHeaders({
    //     'Authorization':api.key,
    //     'Content-Type': 'application/json; charset=utf-8'
    //   });
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    public loginUsuario(data:any) {
        // var json = JSON.parse(data);
        // return this.http.post<any>(api.urlbase+'api/login',json,{ headers: this.header })
        //     .pipe(map(user => {
        //         if(user){
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //             return user;
        //         }
        //     }));
    }

    public logout() {
        this.localStorage.removeItem('currentUser');
        // this.currentUserSubject.next(null);
    }
}