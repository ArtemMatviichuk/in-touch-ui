import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth-state.type';
import { authActions, authFeatureKey } from './actions';

const token = localStorage.getItem('accessToken');

const initialState: AuthState = {
  isSubmitting: false,
  validationErrors: null,
  token: token ?? undefined,
};

const authFeature = createFeature({
  name: authFeatureKey,
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.authSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      token: action.authResponse.token,
    })),
    on(authActions.authFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.logout, (state) => ({
      ...state,
      validationErrors: null,
      token: null,
    }))
  ),
});

export const {
  reducer: authReducer,
  selectIsSubmitting,
  selectToken,
  selectValidationErrors,
} = authFeature;
