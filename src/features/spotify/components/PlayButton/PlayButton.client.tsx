'use client';

import type { CircleConfig } from 'konva/lib/shapes/Circle';
import { Circle, Group } from 'react-konva';
import type { GroupPosition } from '~/features/konva';
import { Triangle } from '~/features/konva';

/**
 * props for {@link PlayButton}
 */
type Props = CircleConfig & GroupPosition;

/**
 * spotify play button
 */
export const PlayButton = ({
  x,
  y,
  radius = 0,
  ...props
}: Props): JSX.Element => {
  const triangleSize = radius * 0.4;

  return (
    <Group x={x} y={y}>
      <Circle {...props} radius={radius} fill='#000000' />
      <Triangle side={triangleSize} fill='#ffffff' direction='right' />
    </Group>
  );
};
