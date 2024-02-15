import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'it-page-not-found',
  templateUrl: './page-not-found.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class PageNotFoundComponent {}
