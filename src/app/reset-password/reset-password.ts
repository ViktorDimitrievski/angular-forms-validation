import { Component, signal } from '@angular/core';
import { apply, form, FormField, required } from '@angular/forms/signals';
import { fieldsMatchValidation } from '../core/helpers/custom-validators';

interface MResetPassword {
  password: string;
  confirmPassword: string;
}

@Component({
  imports: [FormField],
  selector: 'app-reset-password',
  styleUrl: './reset-password.scss',
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  resetPasswordModel = signal<MResetPassword>({
    password: '',
    confirmPassword: '',
  });

  form = form(this.resetPasswordModel, (schema) => {
    required(schema.password, { message: 'Password is required' });
    required(schema.confirmPassword, { message: 'Confirm Password is required' });
    apply(
      schema,
      fieldsMatchValidation('password', 'confirmPassword', {
        kind: 'passwordMismatch',
        message: 'Passwords do not match',
      }),
    );
  });
}
