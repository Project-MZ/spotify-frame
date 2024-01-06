import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * props for {@link Fieldset}
 */
type Props = ComponentPropsWithoutRef<'fieldset'> & {
  /** whether to place label and input horizontally */
  horizontal?: boolean;
};

/**
 * label
 */
export const Fieldset = ({
  className,
  horizontal = false,
  ...props
}: Props): JSX.Element => (
  <fieldset
    {...props}
    className={classNames(
      'flex',
      !horizontal && 'flex-col space-y-2',
      className,
    )}
  />
);
