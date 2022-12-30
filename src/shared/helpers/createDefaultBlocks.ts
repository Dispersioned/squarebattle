import { Block, Field } from 'shared/types';

import { getFieldSize } from './getFieldSize';

export function createDefaultBlocks(field: Field) {
  const blocks: Block[] = [];
  const { rows, cols } = getFieldSize(field);

  blocks.push({
    player: 'first',
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  });

  blocks.push({
    player: 'second',
    start: {
      x: rows,
      y: cols,
    },
    end: {
      x: rows,
      y: cols,
    },
  });

  return blocks;
}
