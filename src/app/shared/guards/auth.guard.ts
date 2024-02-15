import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from '../../auth/store/reducers';
import { map, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { authActions } from '../../auth/store/actions';

export const authGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectToken).pipe(
    map((token) => {
      if (!token) {
        return false;
      }

      const data = jwtDecode(token);
      const currentDate = Math.floor(new Date().getTime() / 1000);

      return !!data.exp && data.exp > currentDate;
    }),
    tap((isLogged) => {
      if (!isLogged) {
        store.dispatch(authActions.logout());
        router.navigateByUrl('/auth');
      }
    })
  );
};
