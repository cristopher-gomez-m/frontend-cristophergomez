import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../core/services/session.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService:SessionService = inject(SessionService);

  // Si no está logeado, redirige al login
  if (!sessionService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true; // permite el acceso
};
