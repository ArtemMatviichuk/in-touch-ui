import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return action$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((authResponse) => {
            persistenceService.set('accessToken', authResponse.token);
            return authActions.authSuccess({ authResponse });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.authFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const loginffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return action$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        authService.login(request).pipe(
          map((authResponse) => {
            persistenceService.set('accessToken', authResponse.token);
            return authActions.authSuccess({ authResponse });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.authFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterAuthSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.authSuccess),
      tap(() => router.navigateByUrl('/'))
    ),
  { functional: true, dispatch: false }
);
