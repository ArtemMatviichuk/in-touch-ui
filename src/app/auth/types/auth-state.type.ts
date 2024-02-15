import { ServerExceptions } from 'src/app/shared/types/server-exception.type';

export type AuthState = {
  isSubmitting: boolean;
  token: string | null | undefined;
  validationErrors: ServerExceptions | null;
};
