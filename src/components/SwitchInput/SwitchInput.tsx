import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * props for {@link SwitchInput}
 */
type Props = ComponentPropsWithoutRef<typeof Switch>;

/**
 * switch input
 */
export const SwitchInput = ({
  className,
  checked,
  ...props
}: Props): JSX.Element => (
  <Switch
    id='darkTheme'
    checked={checked}
    className={classNames(
      'relative inline-flex h-6 w-11 items-center rounded-full',
      checked ? 'bg-spotify-green' : 'bg-gray-200',
    )}
    {...props}
  >
    <span
      className={classNames(
        'inline-block h-4 w-4 transform rounded-full bg-white transition',
        checked ? 'translate-x-6' : 'translate-x-1',
      )}
    />
  </Switch>
);
