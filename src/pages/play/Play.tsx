import { createFlatField } from 'shared/helpers/createFlatField';
import { useTypeSelector } from 'shared/hooks/redux';

import { Cell, Container, FieldContainer } from './style';

export function Play() {
  const { field } = useTypeSelector((state) => state.game);
  const width = field.length;
  const height = field[0].length;

  const flatField = createFlatField(field);

  return (
    <Container>
      <FieldContainer width={width} height={height}>
        {flatField.map((cell) => (
          <Cell key={cell.key} />
        ))}
      </FieldContainer>
    </Container>
  );
}
