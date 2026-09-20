import { schema, type Schema, validateTree } from '@angular/forms/signals';

export interface IFieldsMatchOptions {
  kind: string;
  message: string;
}

/**
 * Creates a schema that validates if two fields match.
 * @param field The name of the primary field.
 * @param confirmationField The name of the confirmation field.
 * @param options Validation options including kind and message.
 * @returns A schema that can be used in Angular forms signals.
 */
export function fieldsMatchValidation<TField extends string, TConfirmationField extends string>(
  field: TField,
  confirmationField: TConfirmationField,
  options: IFieldsMatchOptions,
): Schema<Record<TField | TConfirmationField, unknown>> {
  const matchingSchema = schema<Record<string, unknown>>((path) => {
    validateTree(path, (ctx) => {
      const value = ctx.value();

      return value[field] === value[confirmationField]
        ? null
        : {
            kind: options.kind,
            message: options.message,
            fieldTree: ctx.fieldTree[confirmationField],
          };
    });
  });

  return matchingSchema as Schema<Record<TField | TConfirmationField, unknown>>;
}
