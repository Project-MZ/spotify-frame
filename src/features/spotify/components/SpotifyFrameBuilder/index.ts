'use client';

import dynamic from 'next/dynamic';

export const SpotifyFrameBuilder = dynamic(
  () =>
    import('./SpotifyFrameBuilder.client').then(
      ({ SpotifyFrameBuilder: Component }) => Component,
    ),
  {
    ssr: false,
  },
);
