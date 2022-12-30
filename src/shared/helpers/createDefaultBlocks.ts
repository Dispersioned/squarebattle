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
      x: cols - 1,
      y: rows - 1,
    },
    end: {
      x: cols - 1,
      y: rows - 1,
    },
  });

  return blocks;
}
