'use client';

import type { Image as KonvaImage } from 'konva/lib/shapes/Image';
import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { Layer } from 'react-konva';
import { Image } from '../Image';

/**
 * props for {@link FilteredImage}
 */
type Props = ComponentPropsWithoutRef<typeof Image> & {
  filter: CanvasRenderingContext2D['filter'];
};

/**
 * image with filter
 */
export const FilteredImage = ({ filter, ...props }: Props): JSX.Element => {
  const ref = useRef<KonvaImage>(null);

  useLayoutEffect(() => {
    ref.current?.getLayer()?.getContext().setAttr('filter', filter);
  }, [filter]);

  return (
    <Layer>
      <Image {...props} ref={ref} />
    </Layer>
  );
};
