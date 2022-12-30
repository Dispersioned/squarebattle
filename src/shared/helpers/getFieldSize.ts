import { Field } from 'shared/types';

export function getFieldSize(field: Field) {
  const rows = field.length;
  const cols = field[0].length;
  return { rows, cols };
}
