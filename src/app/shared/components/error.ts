import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

/**
 * Error message component for Signal Forms (@angular/forms/signals).
 *
 * Renders a validation error message for a given form field. The component inspects the field's
 * `FieldState` and displays the message of the first error whose `kind` matches the provided `code`.
 * The error is only shown when the field has been touched, is invalid, and a matching error exists.
 *
 * @example
 * ```html
 * <error [state]="form.password()" />
 * <error [state]="form.email()" kind=emailMismatch" />
 * ```
 */
@Component({
  selector: 'error',
  host: { class: 'error' },
  template: `
    @if (visible()) {
      {{ message() }}
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  /**
   * The `FieldState` instance of the form field to validate and display errors for.
   * This is the primary data source — all error information (errors array, touched state, validity)
   * is read from this signal. Required; the component will not render without it.
   *
   * @example `form.password()` or `form.email()`
   */
  readonly state = input.required<FieldState<unknown>>();

  /**
   * The error `kind` string used to identify which validation error to display from the field's
   * `errors()` array.
   * @example `'emailMismatch'`, `'minlength'`, `'required'`
   */
  readonly kind = input<string>('required');

  /**
   * Computed that searches the field's `errors()` array for the first `ValidationError` whose
   * `kind` matches the current `code` input. Returns `undefined` when no matching error is found,
   * which drives both the `visible` and `message` computeds.
   */
  private readonly error = computed(() =>
    this.state()
      .errors()
      .find((e) => e.kind === this.kind()),
  );

  /**
   * Computed that determines whether the error message should be visible in the DOM.
   * Returns `true` only when all three conditions are met: the field has been `touched`
   * (user has interacted with it), the field is `invalid`, and a matching error was found
   * via the `error` computed.
   */
  protected readonly visible = computed(() => {
    const state = this.state();
    return state.touched() && state.invalid() && this.error();
  });

  /**
   * Resolves the display message for the current error. Returns the `message`
   * property of the matched `ValidationError` from the `error` computed. Falls back to the
   * generic string `'The field is invalid.'`
   */
  protected readonly message = computed(() => {
    return this.error()?.message ?? 'The field is invalid.';
  });
}
