export function createField(x: number, y: number) {
  const field: number[][] = [];

  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      row.push(0);
    }
    field.push(row);
  }

  return field;
}
