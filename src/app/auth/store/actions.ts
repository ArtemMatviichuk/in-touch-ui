import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthRequest } from '../types/auth-request.type';
import { ServerExceptions } from 'src/app/shared/types/server-exception.type';
import { AuthResponse } from '../types/auth-response.type';

export const authFeatureKey = 'auth';

export const authActions = createActionGroup({
  source: authFeatureKey,
  events: {
    Register: props<{ request: AuthRequest }>(),
    Login: props<{ request: AuthRequest }>(),
    'Auth Success': props<{ authResponse: AuthResponse }>(),
    'Auth Failure': props<{ errors: ServerExceptions }>(),
    Logout: emptyProps(),
  },
});
