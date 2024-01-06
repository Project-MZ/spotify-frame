'use client';

import type { CircleConfig } from 'konva/lib/shapes/Circle';
import { Circle, Group, Rect } from 'react-konva';
import type { GroupPosition } from '~/features/konva';
import { Triangle, useKonvaContext } from '~/features/konva';
/**
 * props for {@link PlayButton}
 */
type Props = CircleConfig &
  GroupPosition & {
    /** background color */
    backgroundColor: string;
    /** text color */
    textColor: string;
    /** whether the song is being played */
    playing: boolean;
  };

/**
 * spotify play button
 */
export const PlayButton = ({
  x,
  y,
  backgroundColor,
  textColor,
  radius = 0,
  playing = false,
  ...props
}: Props): JSX.Element => {
  const { relativeX } = useKonvaContext();
  const barCornerRadius = 9999;
  const barWidth = relativeX(8);
  const barHeight = radius * 0.7;
  const triangleSize = radius * 0.4;

  return (
    <Group x={x} y={y}>
      <Circle {...props} radius={radius} fill={backgroundColor} />
      {playing ? (
        <Group y={-barHeight / 2}>
          <Rect
            x={-barWidth / 2 - barWidth}
            width={barWidth}
            height={barHeight}
            cornerRadius={barCornerRadius}
            fill={textColor}
          />
          <Rect
            x={-barWidth / 2 + barWidth}
            width={barWidth}
            height={barHeight}
            cornerRadius={barCornerRadius}
            fill={textColor}
          />
        </Group>
      ) : (
        <Triangle side={triangleSize} fill={textColor} direction='right' />
      )}
    </Group>
  );
};
