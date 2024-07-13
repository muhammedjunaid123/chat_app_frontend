import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router) 

  if (!localStorage.getItem(environment.UserSecret)) {
    _router.navigate(['login'])
    return false
  }
 
  return true
};
