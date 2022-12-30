export function createField(x: number, y: number) {
  const field: number[][] = [];

  for (let i = 0; i < y; i++) {
    const row = [];
    for (let j = 0; j < x; j++) {
      row.push(0);
    }
    field.push(row);
  }

  return field;
}
