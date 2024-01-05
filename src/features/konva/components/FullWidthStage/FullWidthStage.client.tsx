'use client';

import classNames from 'classnames';
import { type Stage as IStage } from 'konva/lib/Stage';
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { StageProps } from 'react-konva';
import { Stage } from 'react-konva';
import { useKonvaContext } from '~/features/konva';
import { useMounted } from '~/hooks/useMounted';
import styles from './FullWidthStage.module.css';

/**
 * props for {@link FullWidthStage}
 */
type Props = {
  /** ref to {@link IStage | Stage} */
  stageRef: RefObject<IStage>;
  /** className */
  className?: string;
  /** children */
  children?: ReactNode;
  /** relative base in pixel */
  base: number;
  /** aspect ratio */
  aspectRatio: number;
  /** max width */
  maxWidth?: number;
  /** click event handler */
  onClick?: StageProps['onClick'];
};

/**
 * {@link Stage} that resize automatically
 */
export const FullWidthStage = ({
  stageRef,
  className,
  children,
  base,
  aspectRatio,
  maxWidth = Infinity,
  onClick,
  ...props
}: Props): JSX.Element => {
  /** ref to div to calc real width and height of canvas element */
  const sizeGetterRef = useRef<HTMLDivElement>(null);
  const { setScale } = useKonvaContext();
  const [width, setWidth] = useState(0);
  const height = width / aspectRatio;

  /**
   * resize Stage based on window size
   */
  const resizeStage = (): void => {
    const parent = sizeGetterRef.current?.parentElement;
    if (!parent) return;
    const computedStyle = getComputedStyle(parent);
    const actualWidth =
      parent.clientWidth -
      parseFloat(computedStyle.paddingRight) -
      parseFloat(computedStyle.paddingLeft);
    setWidth(actualWidth > maxWidth ? maxWidth : actualWidth);
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

  const sizeGetter = <div ref={sizeGetterRef} aria-hidden />;

  return width === 0 ? (
    sizeGetter
  ) : (
    <>
      {sizeGetter}
      <Stage
        {...props}
        ref={stageRef}
        className={classNames(styles.stage, className)}
        width={width}
        height={height}
        onClick={onClick}
      >
        {children}
      </Stage>
    </>
  );
};
