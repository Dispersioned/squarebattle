import { styled } from '@mui/material';
import { CELL_SIZE_PX } from 'shared/config';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  /* disable select for correct zone placement */
  user-select: none;
`;

export const FieldContainer = styled('div', { shouldForwardProp: (p) => p !== 'rows' && p !== 'cols' })<{
  cols: number;
  rows: number;
}>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, ${CELL_SIZE_PX});
  grid-template-rows: repeat(${(props) => props.rows}, ${CELL_SIZE_PX});
  border: 1px solid #bbb;
`;
