import { inject, Inject, Injectable } from "@angular/core";
import { AuthService } from "../../../infrastructure/services/auth/auth.service";
import { catchError, tap } from "rxjs";
import { UserAuthModel } from "../../models/user-auth-model";

@Injectable({ providedIn: 'root' })
export class RenewTokenUseCase{
  private authService = inject(AuthService);
  execute = () => this.authService.renewToken().pipe(
    tap((resp: UserAuthModel) => {
      localStorage.setItem('token', resp.token);
    }),
    // catchError(() => )
  );
}
