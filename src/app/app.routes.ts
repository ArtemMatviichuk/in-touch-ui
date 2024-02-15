import { Route } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [isLoggedInGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/home/home.routes').then((m) => m.homeRoutes),
    canActivate: [authGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
