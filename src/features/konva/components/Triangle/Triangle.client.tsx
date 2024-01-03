'use client';

import type { StarConfig } from 'konva/lib/shapes/Star';
import { Star } from 'react-konva';

/**
 * props for {@link Triangle}
 */
type Props = {
  /** x position */
  x?: StarConfig['x'];
  /** y position */
  y?: StarConfig['y'];
  /** fill color */
  fill?: StarConfig['fill'];
  /** triangle side length */
  side: number;
  /** triangle pointing direction */
  direction: 'top' | 'right' | 'bottom' | 'left';
};

/**
 * triangle
 */
export const Triangle = ({
  direction = 'top',
  side,
  ...props
}: Props): JSX.Element => {
  const rotation = ((): number => {
    if (direction === 'right') return 90;
    if (direction === 'bottom') return 180;
    if (direction === 'left') return -90;
    return 0;
  })();

  return (
    <Star
      {...props}
      innerRadius={side / 2}
      outerRadius={side}
      numPoints={3}
      rotation={rotation}
    />
  );
};
