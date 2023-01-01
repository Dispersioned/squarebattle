import { ReactNode } from 'react';

export type Player = 'first' | 'second';
export type Coords = {
  x: number;
  y: number;
};
export type ICell = {
  value: number;
  key: string;
  coords: Coords;
};
export type Field = number[][];
export type FlatField = ICell[];
export type Block = {
  player: Player;
  start: Coords;
  end: Coords;
};
export type Indexes = {
  lx: number;
  rx: number;
  ly: number;
  ry: number;
};
export type Dices = [number, number];
