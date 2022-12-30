import { Coords } from 'shared/types';

export function getCellCoords(cellTouchEvent: React.MouseEvent<HTMLDivElement, MouseEvent>): Coords | null {
  const element = cellTouchEvent.target as HTMLElement;
  const { x, y } = element.dataset;
  if (!x || !y) return null;
  return { x: +x, y: +y };
}
