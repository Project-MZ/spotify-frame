import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * props for {@link Input}
 */
type Props = ComponentPropsWithoutRef<'input'>;

/**
 * input
 */
export const Input = ({ className, ...props }: Props): JSX.Element => (
  <input
    {...props}
    className={classNames(
      'rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500',
      className,
    )}
  />
);
