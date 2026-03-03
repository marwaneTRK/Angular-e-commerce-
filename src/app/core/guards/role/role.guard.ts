// core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser();
  const expectedRole = route.data?.['role'];

  if (user?.role !== expectedRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
