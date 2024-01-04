import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * props for {@link Label}
 */
type Props = ComponentPropsWithoutRef<'label'> & {
  /** for */
  htmlFor: string;
};

/**
 * label
 */
export const Label = ({ className, htmlFor, ...props }: Props): JSX.Element => (
  <label
    {...props}
    htmlFor={htmlFor}
    className={classNames('text-xs text-gray-400', className)}
  />
);
