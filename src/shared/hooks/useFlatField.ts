import { useMemo } from 'react';
import { Field, FlatField } from 'shared/types';

export function useFlatField(field: Field) {
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

  return useMemo(() => flatField, [field]);
}
