import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthRequest } from '../../types/auth-request.type';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import { ServerExceptionsComponent } from 'src/app/shared/components/server-exceptions/server-exceptions.component';

@Component({
  selector: 'it-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ServerExceptionsComponent],
})
export class LoginComponent {
  public form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

  public data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    serverExceptions: this.store.select(selectValidationErrors),
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  public onSubmit() {
    const request: AuthRequest = this.form.getRawValue();

    this.store.dispatch(authActions.login({ request }));
  }
}
