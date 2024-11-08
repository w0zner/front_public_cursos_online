import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService= inject(AuthService);

  if (!authService.user) {
    authService.logout();
    return false;
  }

  let token = authService.token
  if(!token){
    authService.logout()
    return false;
  }

  let expiration = (JSON.parse(atob(token.split(".")[1]))).exp;
  if(Math.floor((new Date().getTime())/1000) >= expiration){
    authService.logout()
    return false;
  }

  return true;
};

