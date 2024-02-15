import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { combineLatest, takeUntil } from 'rxjs';
import { ServerExceptionsComponent } from 'src/app/shared/components/server-exceptions/server-exceptions.component';
import { DestroyableComponent } from 'src/app/shared/directives/destroyable-component.directive';

@Component({
  selector: 'it-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    ServerExceptionsComponent,
  ],
})
export class RegisterComponent extends DestroyableComponent implements OnInit {
  public form: FormGroup;

  public data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    serverExceptions: this.store.select(selectValidationErrors),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    super();

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      repeatPassword: [null, [Validators.required, this.passwordValidator]],
    });
  }

  public ngOnInit() {
    this.form.controls['password'].valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() =>
        this.form.controls['repeatPassword'].updateValueAndValidity()
      );
  }

  public onSubmit() {
    const request: AuthRequest = this.form.getRawValue();

    this.store.dispatch(authActions.register({ request }));
  }

  private passwordValidator = () => {
    const password = this.form?.controls['password'].value;
    const repeat = this.form?.controls['repeatPassword'].value;

    return password !== repeat ? { confirmedValidator: true } : null;
  };
}
