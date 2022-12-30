import { useTypeSelector } from 'shared/hooks/redux';
import { useFlatField } from 'shared/hooks/useFlatField';

import { Cell, Container, FieldContainer } from './style';

export function Play() {
  const { field } = useTypeSelector((state) => state.game);
  const width = field.length;
  const height = field[0].length;

  const flatField = useFlatField(field);

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
