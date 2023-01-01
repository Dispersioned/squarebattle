import { Typography, styled } from '@mui/material';

export const UIInfo = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const UIDices = styled('div')`
  display: flex;
  gap: 10px;
`;

export const Dice = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 2px solid gray;
  color: #777;
  font-weight: bold;
`;
