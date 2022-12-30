import { ReactNode } from 'react';

export type Cell = {
  value: number;
  key: string;
};

export type Field = number[][];
export type FlatField = Cell[];
