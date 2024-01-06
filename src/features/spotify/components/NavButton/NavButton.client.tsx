'use client';

import { Rect, Group } from 'react-konva';
import type { GroupPosition } from '~/features/konva';
import { useKonvaContext, Triangle } from '~/features/konva';

/**
 * props for {@link NavButton}
 */
type Props = GroupPosition & {
  /** color */
  color: string;
  /** prev or next */
  type: 'prev' | 'next';
  /** side */
  side: number;
};

/**
 * spotify prev/next button
 */
export const NavButton = ({ x, y, color, type, side }: Props): JSX.Element => {
  const { relativeX } = useKonvaContext();
  const rotation = type === 'prev' ? 180 : 0;

  return (
    <Group x={x} y={y} rotation={rotation}>
      <Triangle side={side} fill={color} direction='right' />
      <Rect
        x={(side / 2) * Math.sqrt(3)}
        y={-side}
        width={relativeX(5)}
        height={side * 2}
        cornerRadius={9999}
        fill={color}
      />
    </Group>
  );
};
