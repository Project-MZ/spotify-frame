'use client';

import type { CircleConfig } from 'konva/lib/shapes/Circle';
import { Group } from 'react-konva';
import { useKonvaContext } from '~/features/konva';
import type { GroupPosition } from '~/features/konva';
import { NavButton } from '../NavButton';
import { PlayButton } from '../PlayButton';

/**
 * props for {@link Controls}
 */
type Props = CircleConfig & GroupPosition;

/**
 * spotify controls
 */
export const Controls = ({
  x,
  y,
  radius = 0,
  ...props
}: Props): JSX.Element => {
  const { relativeX } = useKonvaContext();

  const space = relativeX(200);
  const navSide = radius * 0.4;

  return (
    <Group x={x} y={y}>
      <NavButton x={-space} type='prev' side={navSide} />
      <PlayButton {...props} radius={radius} />
      <NavButton x={space} type='next' side={navSide} />
    </Group>
  );
};
