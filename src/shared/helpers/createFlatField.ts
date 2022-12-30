import { Field, FlatField } from 'shared/types';

export function createFlatField(field: Field) {
  const flatField: FlatField = [];

  field.forEach((row, rowi) => {
    row.forEach((col, coli) => {
      flatField.push({
        value: 0,
        key: `${rowi}-${coli}`,
        coords: {
          x: coli,
          y: rowi,
        },
      });
    });
  });

  return flatField;
}
