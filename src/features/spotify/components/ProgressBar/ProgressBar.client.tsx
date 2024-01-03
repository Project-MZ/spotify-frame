'use client';

import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { TextConfig } from 'konva/lib/shapes/Text';
import { Group, Rect, Text } from 'react-konva';
import { useKonvaContext } from '~/features/konva';

/**
 * props for {@link ProgressBar}
 */
type Props = RectConfig & {
  /** where to place circle (between 0 to 1) */
  at: number;
  /** text for current point of the music */
  now: string;
  /** text for duration of the music */
  duration: string;
  /** font size for duration */
  fontSize: TextConfig['fontSize'];
};

/**
 * spotify progress bar
 */
export const ProgressBar = ({
  x = 0,
  y = 0,
  width = 0,
  at = 0.33,
  now,
  duration,
  fontSize = 10,
  ...props
}: Props): JSX.Element => {
  const { relativeX } = useKonvaContext();
  const cornerRadius = 9999;
  const durationY = fontSize + relativeX(20);

  return (
    <Group x={x} y={y}>
      <Group>
        <Rect
          {...props}
          width={width}
          cornerRadius={cornerRadius}
          fill='rgb(229 231 235)' // text-gray-200
        />
        <Rect
          {...props}
          width={width * at}
          cornerRadius={[cornerRadius, 0, 0, cornerRadius]}
        />
      </Group>
      <Group y={durationY}>
        <Text width={width} text={now} fontSize={fontSize} align='left' />
        <Text width={width} text={duration} fontSize={fontSize} align='right' />
      </Group>
    </Group>
  );
};
