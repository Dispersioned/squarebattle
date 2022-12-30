import { ReactNode } from 'react';

export type Coords = {
  x: number;
  y: number;
};
export type Cell = {
  value: number;
  key: string;
  coords: Coords;
};
export type Field = number[][];
export type FlatField = Cell[];
