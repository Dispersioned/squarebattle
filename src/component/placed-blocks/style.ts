import { styled } from '@mui/material';

export const CellContainer = styled('div')`
  border: 1px solid #bbb;
`;

export const Block = styled('div')`
  position: absolute;
  transition: all 0.03s;
  background: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
