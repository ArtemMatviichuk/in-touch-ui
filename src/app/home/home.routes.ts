import { Route } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];
