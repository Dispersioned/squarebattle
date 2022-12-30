import { styled } from '@mui/material';

export const Container = styled('div')`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const FieldContainer = styled('div', { shouldForwardProp: (p) => p !== 'height' && p !== 'width' })<{
  height: number;
  width: number;
}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 20px);
  grid-template-rows: repeat(${(props) => props.height}, 20px);
  border: 1px solid #bbb;
`;

export const Cell = styled('div')`
  border: 1px solid #bbb;
`;
