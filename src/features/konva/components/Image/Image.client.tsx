'use client';

import type { ImageConfig } from 'konva/lib/shapes/Image';
import { Image as KonvaImage } from 'react-konva';

/**
 * props for {@link Image}
 */
type Props = {
  /** x position */
  x?: ImageConfig['x'];
  /** y position */
  y?: ImageConfig['y'];
  /** width */
  width?: ImageConfig['width'];
  /** height */
  height?: ImageConfig['height'];
  /** corner radius */
  cornerRadius?: ImageConfig['cornerRadius'];
  /** fill */
  fill?: ImageConfig['fill'];
  /** image src */
  src: string;
};

/**
 * image
 */
export const Image = ({ src, ...props }: Props): JSX.Element => {
  const image = new window.Image();
  image.src = src;

  return <KonvaImage {...props} image={image} />;
};
