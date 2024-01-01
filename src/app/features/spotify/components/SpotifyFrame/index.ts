'use client';

import dynamic from 'next/dynamic';

export const SpotifyFrame = dynamic(
  () =>
    import('./SpotifyFrame.client').then(
      ({ SpotifyFrame: Component }) => Component,
    ),
  {
    ssr: false,
  },
);
