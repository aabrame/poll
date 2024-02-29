import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const user = authenticationService.connectedUser.value;
  if (user &&
      !req.url.includes('authenticate'))
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + user.accessToken)
      })
  return next(req);
};
