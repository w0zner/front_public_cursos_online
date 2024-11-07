import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { URL_FROTEND, URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any= null;
  token: any= null;

  constructor(private http: HttpClient, private router: Router) { this.initAuthValues() }

  initAuthValues() {
    if(localStorage.getItem("token")) {
      this.user= JSON.parse(localStorage.getItem("user") || '')
      this.token= localStorage.getItem("token")
    }
  }

  login(email: string, password: string) {
    const URL = URL_SERVICIOS + "/users/login"
    return this.http.post(URL, {email: email, password: password}).pipe(
      map((response:any)=>{
        console.log(response)
        const result = this.saveLocalStorage(response)
        return result
      }),
      catchError((err:any)=>{
        console.log(err)
        return of(undefined)
      })
    )
  }

  register(data: any){
    const URL = URL_SERVICIOS + "/users/register"
    return this.http.post(URL, data)
  }

  private saveLocalStorage(auth: any){
    if(auth && auth.user.token) {
      localStorage.setItem("token", auth.user.token)
      localStorage.setItem("user", JSON.stringify(auth.user.user))
      return true
    }
    return false
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setTimeout(() => {
      location.href = URL_FROTEND + '/auth/login'
    }, 50);
  }

}


