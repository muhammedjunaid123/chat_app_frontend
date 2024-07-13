import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';

export const logoutGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
 if(localStorage.getItem(environment.UserSecret)){
  _router.navigate(['chat'])
  return false
 }else{
  return true
 }
};

