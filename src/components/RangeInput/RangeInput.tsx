import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './RangeInput.module.css';

/**
 * props for {@link RangeInput}
 */
type Props = ComponentPropsWithoutRef<'input'>;

/**
 * range input
 */
export const RangeInput = ({ className, ...props }: Props): JSX.Element => (
  <input
    {...props}
    type='range'
    className={classNames(styles.input, className)}
  />
);
