import { Component, signal } from '@angular/core';
import { apply, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { fieldsMatchValidation } from '../core/helpers/custom-validators';
import { ErrorComponent } from '../shared/components/error';
import { ErrorClassDirective } from '../shared/directives/error.directive';

interface MResetPassword {
  password: string;
  confirmPassword: string;
}

@Component({
  imports: [FormRoot, FormField, ErrorComponent, ErrorClassDirective],
  selector: 'app-reset-password',
  styleUrl: './reset-password.scss',
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  resetPasswordModel = signal<MResetPassword>({
    password: '',
    confirmPassword: '',
  });

  form = form(
    this.resetPasswordModel,
    (schema) => {
      required(schema.password, { message: 'Password is required' });
      required(schema.confirmPassword, { message: 'Confirm Password is required' });
      apply(
        schema,
        fieldsMatchValidation('password', 'confirmPassword', {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        }),
      );
    },
    {
      submission: {
        action: async () => {
          // runs only when the form is valid
        },
      },
    },
  );
}
