import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, tap} from "rxjs";

export interface IUser{
  login: string;
  name: string;
  surname: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://deep-sea.ru/rest/';
  user: IUser | undefined;
  tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {
    if (!this.isAuth()){
      this.router.navigate(['login']);
    }
  }

  isAuth(){
    let token = sessionStorage.getItem('token');
    if (token){
      return this.loginByToken(token);
    }
    else{
      return false;
    }
  }

  loginByLoginPassword(login: string, password: string){
    return this.http.get<IUser>(this.url + 'login', {params: {login, password}})
      .pipe(
        tap(user => {
          this.user = user;
          sessionStorage.setItem(this.tokenKey, this.user.token)
        }),
        map(user => {
          return user.login != null
        })
      );
  }
  loginByToken(token: string){
    return this.http.get<IUser>(this.url + 'login', {params: {token}})
      .pipe(
        tap(user => {
          this.user = user;
        }),
        map(user => {
          return user.login != null
        })
      );
  }
}
