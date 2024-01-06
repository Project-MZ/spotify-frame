'use client';

import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { TextConfig } from 'konva/lib/shapes/Text';
import { Group, Rect, Text } from 'react-konva';
import { useKonvaContext } from '~/features/konva';

/**
 * props for {@link ProgressBar}
 */
type Props = RectConfig & {
  /** background color */
  backgroundColor: string;
  /** text color */
  textColor: string;
  /** where to place circle (between 0 to 1) */
  progress: number;
  /** text for current point of the music */
  nowAt: string;
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
  backgroundColor,
  textColor,
  progress = 0.33,
  nowAt = '',
  duration = '',
  fontSize = 10,
  ...props
}: Props): JSX.Element => {
  const { relativeX } = useKonvaContext();
  const durationY = fontSize + relativeX(20);
  const cornerRadius = 9999;
  const rigthRadius = progress === 100 ? cornerRadius : 0;

  return (
    <Group x={x} y={y}>
      <Group>
        <Rect
          {...props}
          width={width}
          cornerRadius={cornerRadius}
          fill={backgroundColor}
        />
        <Rect
          {...props}
          width={width * progress * 0.01}
          cornerRadius={[cornerRadius, rigthRadius, rigthRadius, cornerRadius]}
        />
      </Group>
      <Group y={durationY}>
        <Text
          width={width}
          text={nowAt}
          wrap='none'
          fontSize={fontSize}
          align='left'
          fill={textColor}
        />
        <Text
          width={width}
          text={duration}
          wrap='none'
          fontSize={fontSize}
          align='right'
          fill={textColor}
        />
      </Group>
    </Group>
  );
};
