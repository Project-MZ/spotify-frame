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
  /** whether showing cover photo */
  showCover: boolean;
  /** background opacity */
  backgroundOpacity: number;
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
  showCover,
  backgroundOpacity,
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
  const headingFontSize = relativeX(50);
  const iconWidth = relativeX(25);
  const themeColor = darkTheme ? 'rgb(18, 18, 18)' : 'rgb(255, 255, 255)';
  const inverseColor = darkTheme ? 'rgb(255, 255, 255)' : 'rgb(18, 18, 18)';
  const backgroundColor = darkTheme
    ? `rgba(18, 18, 18, ${backgroundOpacity})`
    : `rgba(255, 255, 255, ${backgroundOpacity})`;
  const authorColor = darkTheme
    ? 'rgba(255, 255, 255, 0.75)'
    : 'rgba(18, 18, 18, 0.5)';
  const placeholderColor = darkTheme
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(18, 18, 18, 0.1)';

  return (
    <FullWidthStage {...props} base={base} aspectRatio={2 / 3} maxWidth={400}>
      <Layer>
        <Image
          src={src}
          x={-(height - width) / 2}
          width={height}
          height={height}
        />
        <Rect width={width} height={height} fill={backgroundColor} />
        <Group x={padding}>
          {showCover && (
            <Image
              src={src}
              y={padding}
              width={fullWidth}
              height={fullWidth}
              cornerRadius={5}
              fill={placeholderColor}
            />
          )}
          <Group y={relativeY(645)}>
            <Group>
              <Text
                text={title}
                width={fullWidth}
                wrap='none'
                fontFamily='Roboto'
                fontSize={headingFontSize}
                fontStyle='700'
                fill={inverseColor}
              />
              <Group y={headingFontSize + relativeY(15)}>
                <Text
                  text={artist}
                  width={fullWidth - iconWidth * 2}
                  wrap='none'
                  fontFamily='Roboto'
                  fontSize={headingFontSize * 0.6}
                  fontStyle='400'
                  fill={authorColor}
                />
                <Heart
                  x={fullWidth - iconWidth * 2}
                  y={(iconWidth - headingFontSize) / 2}
                  width={iconWidth}
                  stroke={liked ? 'rgb(244 114 182)' : inverseColor} // text-pink-400
                  fill={liked ? 'rgb(244 114 182)' : undefined} // text-pink-400
                />
              </Group>
            </Group>
            <Group y={relativeY(100)}>
              <ProgressBar
                width={fullWidth}
                height={relativeY(5)}
                fill={inverseColor}
                backgroundColor={placeholderColor}
                textColor={inverseColor}
                nowAt={nowAt}
                duration={duration}
                progress={progress}
                fontSize={relativeX(25)}
              />
              <Controls
                x={fullWidth * 0.5}
                y={relativeY(105)}
                radius={relativeX(60)}
                playing={playing}
                buttonColor={inverseColor}
                textColor={darkTheme ? backgroundColor : themeColor}
              />
              <Group y={relativeY(175)}>
                <Repeat width={iconWidth} fill={inverseColor} />
                <Share
                  x={fullWidth - iconWidth * 2}
                  width={iconWidth}
                  fill={inverseColor}
                />
              </Group>
            </Group>
          </Group>
        </Group>
      </Layer>
    </FullWidthStage>
  );
};
