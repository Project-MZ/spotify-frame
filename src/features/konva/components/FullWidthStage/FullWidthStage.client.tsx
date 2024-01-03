'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Stage } from 'react-konva';
import { useKonvaContext } from '~/features/konva';
import { useMounted } from '~/hooks/useMounted';

/**
 * props for {@link FullWidthStage}
 */
type Props = {
  /** className */
  className?: string;
  /** children */
  children?: ReactNode;
  /** relative base in pixel */
  base: number;
  /** aspect ratio */
  aspectRatio: number;
};

/**
 * {@link Stage} that resize automatically
 */
export const FullWidthStage = ({
  base,
  aspectRatio,
  children,
  ...props
}: Props): JSX.Element => {
  /** ref to div to calc real width and height of canvas element */
  const ref = useRef<HTMLDivElement>(null);
  const { setScale } = useKonvaContext();
  const [width, setWidth] = useState(0);
  const height = width / aspectRatio;

  /**
   * resize Stage based on window size
   */
  const resizeStage = (): void => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const computedStyle = getComputedStyle(parent);
    setWidth(
      parent.clientWidth -
        parseFloat(computedStyle.paddingRight) -
        parseFloat(computedStyle.paddingLeft),
    );
  };

  useMounted(() => {
    resizeStage();
    window.addEventListener('resize', resizeStage);
    return () => {
      window.removeEventListener('resize', resizeStage);
    };
  });

  useEffect(() => {
    const scaleX = width / base;
    setScale({
      x: scaleX,
      y: scaleX / aspectRatio,
    });
  }, [width, aspectRatio, base, setScale]);

  const sizeGetter = <div ref={ref} aria-hidden />;

  return width === 0 ? (
    sizeGetter
  ) : (
    <>
      {sizeGetter}
      <Stage {...props} width={width} height={height}>
        {children}
      </Stage>
    </>
  );
};
