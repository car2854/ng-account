import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RenewTokenUseCase } from '../../core/use-cases/auth/renew-token.usecase';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const renewTokenUseCase = inject(RenewTokenUseCase);
  const router = inject(Router);

  return renewTokenUseCase.execute().pipe(
    map((success) => {
      if (!success){
        router.navigateByUrl('/auth/login');
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigateByUrl('/auth/login');
      return of(false);
    })
  );
};
