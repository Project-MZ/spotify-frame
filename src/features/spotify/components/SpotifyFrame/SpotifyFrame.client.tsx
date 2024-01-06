'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { Layer, Group, Rect, Text } from 'react-konva';
import {
  useKonvaContext,
  FullWidthStage,
  Image,
  Heart,
} from '~/features/konva';
import { Controls } from '../Controls';
import { ProgressBar } from '../ProgressBar';
import { Repeat } from '../Repeat';
import { Share } from '../Share';

/**
 * props for {@link SpotifyFrame}
 */
type Props = Omit<
  ComponentPropsWithoutRef<typeof FullWidthStage>,
  'base' | 'aspectRatio'
> & {
  /** image src */
  src: string;
  /** whether using dark theme */
  darkTheme: boolean;
  /** title */
  title: string;
  /** artist */
  artist: string;
  /** whether the song is liked */
  liked: boolean;
  /** whether the song is being played */
  playing: boolean;
  /** progress */
  progress: number;
  /** now at */
  nowAt: string;
  /** duration */
  duration: string;
};

/**
 * spotify frame
 */
export const SpotifyFrame = ({
  src,
  darkTheme,
  title,
  artist,
  liked = false,
  playing = false,
  progress,
  nowAt,
  duration,
  ...props
}: Props): JSX.Element => {
  const { relativeX, relativeY } = useKonvaContext();
  const base = 1000;
  const width = relativeX(base);
  const height = relativeY(base);
  const padding = relativeX(100);
  const fullWidth = width - padding * 2;
  const imageMargin = relativeX(75);
  const imageWidth = fullWidth - imageMargin * 2;
  const headingFontSize = relativeX(50);
  const iconWidth = relativeX(25);
  const backgroundColor = darkTheme ? '#121212' : '#FFFFFF';
  const textColor = darkTheme ? '#FFFFFF' : '#121212';
  const placeholderColor = darkTheme
    ? 'rgb(55 65 81)' // gray-700
    : 'rgb(229 231 235)'; // gray-200

  return (
    <FullWidthStage {...props} base={base} aspectRatio={3 / 4} maxWidth={400}>
      <Layer>
        <Rect width={width} height={height} fill={backgroundColor} />
        <Group x={padding}>
          <Image
            src={src}
            x={imageMargin}
            y={padding}
            width={imageWidth}
            height={imageWidth}
            cornerRadius={5}
            fill={placeholderColor}
          />
          <Group y={relativeY(625)}>
            <Group>
              <Text
                text={title}
                width={fullWidth}
                wrap='none'
                fontFamily='Roboto'
                fontSize={headingFontSize}
                fontStyle='700'
                fill={textColor}
              />
              <Group y={headingFontSize + relativeY(15)}>
                <Text
                  text={artist}
                  width={fullWidth - iconWidth * 2}
                  wrap='none'
                  fontFamily='Roboto'
                  fontSize={headingFontSize * 0.5}
                  fontStyle='400'
                  fill='rgb(156 163 175)' // gray-400
                />
                <Heart
                  x={fullWidth - iconWidth * 2}
                  y={(iconWidth - headingFontSize) / 2}
                  width={iconWidth}
                  stroke={textColor}
                  fill={liked ? textColor : undefined}
                />
              </Group>
            </Group>
            <Group y={relativeY(100)}>
              <ProgressBar
                width={fullWidth}
                height={relativeY(5)}
                fill={textColor}
                backgroundColor={placeholderColor}
                textColor={textColor}
                nowAt={nowAt}
                duration={duration}
                progress={progress}
                fontSize={relativeX(20)}
              />
              <Controls
                x={fullWidth * 0.5}
                y={relativeY(100)}
                radius={relativeX(50)}
                playing={playing}
                buttonColor={textColor}
                textColor={backgroundColor}
              />
              <Group y={relativeY(175)}>
                <Repeat width={iconWidth} fill={textColor} />
                <Share
                  x={fullWidth - iconWidth * 2}
                  width={iconWidth}
                  fill={textColor}
                />
              </Group>
            </Group>
          </Group>
        </Group>
      </Layer>
    </FullWidthStage>
  );
};
