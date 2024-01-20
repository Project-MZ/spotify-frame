'use client';

import type { Image as KonvaImage, ImageConfig } from 'konva/lib/shapes/Image';
import { forwardRef } from 'react';
import { Image as ReactKonvaImage } from 'react-konva';

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
export const Image = forwardRef<KonvaImage, Props>(
  ({ src, ...props }, ref): JSX.Element => {
    const image = new window.Image();
    image.src = src;

    return <ReactKonvaImage {...props} ref={ref} image={image} />;
  },
);
