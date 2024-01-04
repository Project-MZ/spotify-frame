import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * props for {@link Fieldset}
 */
type Props = ComponentPropsWithoutRef<'fieldset'>;

/**
 * label
 */
export const Fieldset = ({ className, ...props }: Props): JSX.Element => (
  <fieldset
    {...props}
    className={classNames('flex flex-col space-y-2', className)}
  />
);
