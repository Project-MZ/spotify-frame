'use client';

import type { ShapeConfig } from 'konva/lib/Shape';
import { Shape } from 'react-konva';

/**
 * props for {@link Repeat}
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
 * repeat
 * - used https://fontawesome.com/icons/shuffle?f=classic&s=solid
 * - coverted by https://demo.qunee.com/svg2canvas/
 */
export const Repeat = ({ ...props }: Props): JSX.Element => (
  <Shape
    {...props}
    sceneFunc={(context, shape) => {
      const width = shape.getAttr('width') as number;
      const scale = 0.1 * width * (16 / 512);

      context.miterLimit = 4;
      context.scale(scale, scale);
      context.beginPath();
      context.moveTo(403.8, 34.4);
      context.bezierCurveTo(
        415.8,
        29.4,
        429.5,
        32.199999999999996,
        438.7,
        41.3,
      );
      context.lineTo(502.7, 105.3);
      context.bezierCurveTo(
        508.7,
        111.3,
        512.1,
        119.39999999999999,
        512.1,
        127.9,
      );
      context.bezierCurveTo(
        512.1,
        136.40000000000003,
        508.70000000000005,
        144.5,
        502.70000000000005,
        150.5,
      );
      context.lineTo(438.70000000000005, 214.5);
      context.bezierCurveTo(
        429.50000000000006,
        223.7,
        415.80000000000007,
        226.4,
        403.80000000000007,
        221.4,
      );
      context.bezierCurveTo(
        391.80000000000007,
        216.4,
        384.00000000000006,
        204.8,
        384.00000000000006,
        191.8,
      );
      context.lineTo(384.00000000000006, 160);
      context.lineTo(352, 160);
      context.bezierCurveTo(341.9, 160, 332.4, 164.7, 326.4, 172.8);
      context.lineTo(284, 229.3);
      context.lineTo(244, 176);
      context.lineTo(275.2, 134.4);
      context.bezierCurveTo(293.3, 110.2, 321.8, 96, 352, 96);
      context.lineTo(384, 96);
      context.lineTo(384, 64);
      context.bezierCurveTo(384, 51.1, 391.8, 39.4, 403.8, 34.4);
      context.closePath();
      context.moveTo(164, 282.7);
      context.lineTo(204, 336);
      context.lineTo(172.8, 377.6);
      context.bezierCurveTo(154.7, 401.8, 126.2, 416, 96, 416);
      context.lineTo(32, 416);
      context.bezierCurveTo(14.3, 416, 0, 401.7, 0, 384);
      context.bezierCurveTo(0, 366.3, 14.3, 352, 32, 352);
      context.lineTo(96, 352);
      context.bezierCurveTo(106.1, 352, 115.6, 347.3, 121.6, 339.2);
      context.lineTo(164, 282.7);
      context.closePath();
      context.moveTo(438.6, 470.7);
      context.bezierCurveTo(
        429.40000000000003,
        479.9,
        415.70000000000005,
        482.59999999999997,
        403.70000000000005,
        477.59999999999997,
      );
      context.bezierCurveTo(
        391.70000000000005,
        472.59999999999997,
        383.90000000000003,
        460.99999999999994,
        383.90000000000003,
        447.99999999999994,
      );
      context.lineTo(383.90000000000003, 416);
      context.lineTo(352, 416);
      context.bezierCurveTo(321.8, 416, 293.3, 401.8, 275.2, 377.6);
      context.lineTo(121.6, 172.8);
      context.bezierCurveTo(115.6, 164.70000000000002, 106.1, 160, 96, 160);
      context.lineTo(32, 160);
      context.bezierCurveTo(14.3, 160, 0, 145.7, 0, 128);
      context.bezierCurveTo(0, 110.30000000000001, 14.3, 96, 32, 96);
      context.lineTo(96, 96);
      context.bezierCurveTo(126.2, 96, 154.7, 110.2, 172.8, 134.4);
      context.lineTo(326.4, 339.2);
      context.bezierCurveTo(332.4, 347.3, 341.9, 352, 352, 352);
      context.lineTo(384, 352);
      context.lineTo(384, 320);
      context.bezierCurveTo(384, 307.1, 391.8, 295.4, 403.8, 290.4);
      context.bezierCurveTo(
        415.8,
        285.4,
        429.5,
        288.2,
        438.7,
        297.29999999999995,
      );
      context.lineTo(502.7, 361.29999999999995);
      context.bezierCurveTo(
        508.7,
        367.29999999999995,
        512.1,
        375.4,
        512.1,
        383.9,
      );
      context.bezierCurveTo(
        512.1,
        392.4,
        508.70000000000005,
        400.5,
        502.70000000000005,
        406.5,
      );
      context.lineTo(438.70000000000005, 470.5);
      context.closePath();
      context.fillStrokeShape(shape);
    }}
  />
);
