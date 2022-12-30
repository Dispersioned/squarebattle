import { Typography } from '@mui/material';
import { Cell } from 'component/cell';
import { useTypeSelector } from 'shared/hooks/redux';
import { useAction } from 'shared/hooks/useAction';
import { useFlatField } from 'shared/hooks/useFlatField';

import { Container, FieldContainer } from './style';

export function Play() {
  const {
    field,
    isPlacing,
    newZone: { startCoords, endCoords },
  } = useTypeSelector((state) => state.game);
  const rows = field.length;
  const cols = field[0].length;

  const flatField = useFlatField(field);

  const { onLeaveField, onHoverWhilePlacing, onStartPlacement, onEndPlacement } = useAction();

  const onMouseLeaveField = () => {
    if (isPlacing) onLeaveField();
  };

  const onHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isPlacing) onHoverWhilePlacing(e);
  };

  return (
    <Container>
      <Typography>Is placing? {isPlacing ? 'true' : 'false'}</Typography>
      <FieldContainer
        rows={rows}
        cols={cols}
        onMouseLeave={onMouseLeaveField}
        onMouseDown={onStartPlacement}
        onMouseUp={onEndPlacement}
        onMouseMove={onHover}
      >
        {flatField.map((cell) => (
          <Cell key={cell.key} coords={cell.coords} />
        ))}
      </FieldContainer>
    </Container>
  );
}
