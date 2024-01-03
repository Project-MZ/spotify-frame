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
 * - used https://fontawesome.com/icons/heart?f=classic&s=solid
 * - coverted by https://demo.qunee.com/svg2canvas/
 */
export const Heart = ({ ...props }: Props): JSX.Element => (
  <Shape
    {...props}
    sceneFunc={(context, shape) => {
      const width = shape.getAttr('width') as number;
      const scale = 0.1 * width * (16 / 512);

      context.miterLimit = 4;
      context.scale(scale, scale);
      context.beginPath();
      context.moveTo(47.6, 300.4);
      context.lineTo(228.3, 469.1);
      context.bezierCurveTo(235.8, 476.1, 245.70000000000002, 480, 256, 480);
      context.bezierCurveTo(
        266.29999999999995,
        480,
        276.2,
        476.1,
        283.7,
        469.1,
      );
      context.lineTo(464.4, 300.4);
      context.bezierCurveTo(
        494.79999999999995,
        272.09999999999997,
        512,
        232.39999999999998,
        512,
        190.89999999999998,
      );
      context.lineTo(512, 185.09999999999997);
      context.bezierCurveTo(
        512,
        115.19999999999996,
        461.5,
        55.599999999999966,
        392.6,
        44.099999999999966,
      );
      context.bezierCurveTo(347, 36.5, 300.6, 51.4, 268, 84);
      context.lineTo(256, 96);
      context.lineTo(244, 84);
      context.bezierCurveTo(211.4, 51.4, 165, 36.5, 119.4, 44.1);
      context.bezierCurveTo(50.5, 55.6, 0, 115.2, 0, 185.1);
      context.lineTo(0, 190.9);
      context.bezierCurveTo(0, 232.4, 17.2, 272.1, 47.6, 300.4);
      context.closePath();
      context.fillStrokeShape(shape);
    }}
  />
);
