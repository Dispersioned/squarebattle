import { styled } from '@mui/material';

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
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 20px);
  grid-template-rows: repeat(${(props) => props.rows}, 20px);
  border: 1px solid #bbb;
`;
