import { Component, signal } from '@angular/core';
import { apply, email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { fieldsMatchValidation } from '../core/helpers/custom-validators';
import { ErrorComponent } from '../shared/components/error';
import { ErrorClassDirective } from '../shared/directives/error.directive';
interface MEmailChange {
  email: string;
  confirmEmail: string;
}
@Component({
  imports: [FormRoot, FormField, ErrorComponent, ErrorClassDirective],
  selector: 'app-email-change',
  templateUrl: './email-change.html',
})
export class EmailChange {
  emailChangeModel = signal<MEmailChange>({
    email: '',
    confirmEmail: '',
  });

  form = form(
    this.emailChangeModel,
    (schema) => {
      required(schema.email, { message: 'Email is required' });
      email(schema.email, { message: 'Please enter a valid email address' });
      required(schema.confirmEmail, { message: 'Confirm Email is required' });
      email(schema.confirmEmail, { message: 'Please enter a valid email address' });
      apply(
        schema,
        fieldsMatchValidation('email', 'confirmEmail', {
          kind: 'emailMismatch',
          message: 'Emails do not match',
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
