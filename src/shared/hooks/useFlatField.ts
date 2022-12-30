import { Field, FlatField } from 'shared/types';

export function useFlatField(field: Field) {
  const flatField: FlatField = [];

  field.forEach((row, rowi) => {
    row.forEach((col, coli) => {
      flatField.push({
        value: col,
        key: `${rowi}-${coli}`,
      });
    });
  });

  return flatField;
}
