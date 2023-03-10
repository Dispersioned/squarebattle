import { useMemo } from 'react';
import { Field, FlatField } from 'shared/types';

export function useFlatField(field: Field): FlatField {
  const flatField = useMemo(() => {
    const x: FlatField = [];
    field.forEach((row, rowi) => {
      row.forEach((col, coli) => {
        x.push({
          value: col,
          key: `${rowi}-${coli}`,
          coords: {
            x: coli,
            y: rowi,
          },
        });
      });
    });
    return x;
  }, [field]);

  return flatField;
}
