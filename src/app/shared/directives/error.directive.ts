import { computed, Directive, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Directive({
  selector: '[errorClass]',
  host: { '[class.form-field--invalid]': 'isInvalid()' },
})
export class ErrorClassDirective {
  readonly errorClass = input.required<FieldState<unknown>>();

  protected readonly isInvalid = computed(() => {
    const state = this.errorClass();
    return state.invalid() && state.touched();
  });
}
