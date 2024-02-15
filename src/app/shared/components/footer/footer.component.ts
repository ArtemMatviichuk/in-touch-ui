import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'it-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
}
