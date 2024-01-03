'use client';

import type { ShapeConfig } from 'konva/lib/Shape';
import { Shape } from 'react-konva';

/**
 * props for {@link Share}
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
 * share
 * - used https://fontawesome.com/icons/arrow-up-from-bracket?f=classic&s=solid
 * - coverted by https://demo.qunee.com/svg2canvas/
 */
export const Share = ({ ...props }: Props): JSX.Element => (
  <Shape
    {...props}
    sceneFunc={(context, shape) => {
      const width = shape.getAttr('width') as number;
      const scale = 0.1 * width * (16 / 512);

      context.miterLimit = 4;
      context.scale(scale, scale);
      context.beginPath();
      context.moveTo(246.6, 9.4);
      context.bezierCurveTo(
        234.1,
        -3.0999999999999996,
        213.8,
        -3.0999999999999996,
        201.3,
        9.4,
      );
      context.lineTo(73.30000000000001, 137.4);
      context.bezierCurveTo(
        60.80000000000001,
        149.9,
        60.80000000000001,
        170.2,
        73.30000000000001,
        182.7,
      );
      context.bezierCurveTo(
        85.80000000000001,
        195.2,
        106.10000000000001,
        195.2,
        118.60000000000001,
        182.7,
      );
      context.lineTo(192, 109.3);
      context.lineTo(192, 320);
      context.bezierCurveTo(192, 337.7, 206.3, 352, 224, 352);
      context.bezierCurveTo(241.7, 352, 256, 337.7, 256, 320);
      context.lineTo(256, 109.3);
      context.lineTo(329.4, 182.7);
      context.bezierCurveTo(341.9, 195.2, 362.2, 195.2, 374.7, 182.7);
      context.bezierCurveTo(
        387.2,
        170.2,
        387.2,
        149.89999999999998,
        374.7,
        137.39999999999998,
      );
      context.lineTo(246.7, 9.399999999999977);
      context.closePath();
      context.moveTo(64, 352);
      context.bezierCurveTo(64, 334.3, 49.7, 320, 32, 320);
      context.bezierCurveTo(14.299999999999997, 320, 0, 334.3, 0, 352);
      context.lineTo(0, 416);
      context.bezierCurveTo(0, 469, 43, 512, 96, 512);
      context.lineTo(352, 512);
      context.bezierCurveTo(405, 512, 448, 469, 448, 416);
      context.lineTo(448, 352);
      context.bezierCurveTo(448, 334.3, 433.7, 320, 416, 320);
      context.bezierCurveTo(398.3, 320, 384, 334.3, 384, 352);
      context.lineTo(384, 416);
      context.bezierCurveTo(384, 433.7, 369.7, 448, 352, 448);
      context.lineTo(96, 448);
      context.bezierCurveTo(78.3, 448, 64, 433.7, 64, 416);
      context.lineTo(64, 352);
      context.closePath();
      context.fillStrokeShape(shape);
    }}
  />
);
