'use client';

import type { ShapeConfig } from 'konva/lib/Shape';
import { Shape } from 'react-konva';

/**
 * props for {@link Heart}
 */
type Props = {
  /** x position */
  x?: ShapeConfig['x'];
  /** y position */
  y?: ShapeConfig['y'];
  /** width */
  width?: ShapeConfig['width'];
  /** fill */
  fill?: ShapeConfig['fill'];
};

/**
 * heart
 */
export const Heart = ({ ...props }: Props): JSX.Element => (
  <Shape
    {...props}
    sceneFunc={(context, shape) => {
      const width = shape.getAttr('width') as number;
      // const height = shape.getAttr('height') as number;

      const r = width / (2 + Math.sqrt(2));
      const heartWidth = (r / Math.sqrt(2)) * 2;

      context.beginPath();
      context.arc(
        heartWidth / 2,
        r,
        r,
        -(1 / 4) * Math.PI,
        -(5 / 4) * Math.PI,
        true,
      );
      context.lineTo(heartWidth, r * 3); // TODO: calc y
      context.arc(
        3 * (heartWidth / 2),
        r,
        r,
        -(3 / 4) * Math.PI,
        (1 / 4) * Math.PI,
        false,
      );
      context.lineTo(heartWidth, r * 3); // TODO: calc y
      context.closePath();
      context.fillStrokeShape(shape);
    }}
  />
);
