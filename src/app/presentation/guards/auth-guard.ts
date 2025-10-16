import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RenewTokenUseCase } from '../../core/use-cases/auth/renew-token.usecase';

export const authGuard: CanActivateFn = (route, state) => {

  const renewTokenUseCase = inject(RenewTokenUseCase);

  renewTokenUseCase.execute().subscribe();

  return true;
};
