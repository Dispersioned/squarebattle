import { Typography } from '@mui/material';
import { BlockPlacer } from 'component/block-placer';
import { Cell } from 'component/cell';
import { PlacedBlocks } from 'component/placed-blocks';
import { useEffect } from 'react';
import { getFieldSize } from 'shared/helpers/getFieldSize';
import { useTypeSelector } from 'shared/hooks/redux';
import { useAction } from 'shared/hooks/useAction';
import { useFlatField } from 'shared/hooks/useFlatField';

import { Container, FieldContainer } from './style';

export function Play() {
  const { field, isPlacing, player } = useTypeSelector((state) => state.game);
  const flatField = useFlatField(field);
  const { rows, cols } = getFieldSize(field);

  const { onLeaveField, onHoverWhilePlacing, onStartPlacement, onEndPlacement, onCancelPlacement } = useAction();

  const onMouseLeaveField = () => {
    onLeaveField();
  };

  const onHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onHoverWhilePlacing(e);
  };

  useEffect(() => {
    const escapeListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelPlacement();
    };
    document.addEventListener('keydown', escapeListener);
    return () => document.removeEventListener('keydown', escapeListener);
  }, []);

  return (
    <Container>
      <Typography>Press ESC to cancel placement</Typography>
      <Typography>Player turn: {player}</Typography>
      <Typography>Is placing? {isPlacing ? 'true' : 'false'}</Typography>
      <FieldContainer
        rows={rows}
        cols={cols}
        onMouseLeave={onMouseLeaveField}
        onMouseDown={onStartPlacement}
        onMouseUp={onEndPlacement}
        onMouseMove={onHover}
      >
        <PlacedBlocks />
        {isPlacing && <BlockPlacer />}
        {flatField.map((cell) => (
          <Cell key={cell.key} coords={cell.coords} />
        ))}
      </FieldContainer>
    </Container>
  );
}
