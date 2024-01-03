'use client';

import { useEffect } from 'react';

/**
 * `componentDidMount` equivalent hook
 * @param effect
 */
export const useMounted = (effect: () => void): void => {
  useEffect(effect, []);
};
