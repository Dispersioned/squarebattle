import { Typography } from '@mui/material';
import { Cell } from 'component/cell';
import { createFlatField } from 'shared/helpers/createFlatField';
import { useTypeSelector } from 'shared/hooks/redux';
import { useAction } from 'shared/hooks/useAction';

import { Container, FieldContainer } from './style';

export function Play() {
  const { field, isPlacing } = useTypeSelector((state) => state.game);
  const rows = field.length;
  const cols = field[0].length;

  const flatField = createFlatField(field);

  const { onLeaveField } = useAction();

  const onMouseLeaveField = () => {
    if (isPlacing) onLeaveField();
  };

  return (
    <Container>
      <Typography>Is placing? {isPlacing ? 'true' : 'false'}</Typography>
      <FieldContainer rows={rows} cols={cols} onMouseLeave={onMouseLeaveField}>
        {flatField.map((cell) => (
          <Cell key={cell.key} coords={cell.coords} />
        ))}
      </FieldContainer>
    </Container>
  );
}
