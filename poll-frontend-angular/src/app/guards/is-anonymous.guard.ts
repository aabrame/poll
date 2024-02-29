import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const isAnonymousGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const user = authenticationService.connectedUser.value;
  return (user === undefined)
    ? true
    : router.createUrlTree(['/']);
};
