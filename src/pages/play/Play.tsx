import { Typography } from '@mui/material';
import { BlockPlacer } from 'component/block-placer';
import { Cell } from 'component/cell';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { getFieldSize } from 'shared/helpers/getFieldSize';
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
  const flatField = useFlatField(field);
  const { rows, cols } = getFieldSize(field);

  const { onLeaveField, onHoverWhilePlacing, onStartPlacement, onEndPlacement } = useAction();

  const onMouseLeaveField = () => {
    onLeaveField();
  };

  const onHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onHoverWhilePlacing(e);
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
        {isPlacing && <BlockPlacer />}
        {flatField.map((cell) => (
          <Cell key={cell.key} coords={cell.coords} />
        ))}
      </FieldContainer>
    </Container>
  );
}
