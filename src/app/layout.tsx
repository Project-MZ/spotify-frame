import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { BASE_URL, GOOGLE_TAG_MANAGER_ID } from '~/config';
import './globals.css';

const name = 'Spotify Frame';
const description =
  'Frame your photo in a spotify music player. Great for a wedding announcement on social media.';
const url = BASE_URL;
const locale = 'en-US';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { absolute: name, template: `%s | ${name}` },
  description,
  applicationName: name,
  authors: [{ name: 'mizozobu', url: 'https://github.com/mizozobu' }],
  keywords: ['photo', 'image', 'frame', 'spotify', 'wedding', 'social media'],
  openGraph: {
    title: name,
    description,
    locale,
    images: ['/og.png'],
    url: new URL(url),
  },
  twitter: {
    card: 'summary_large_image',
    description,
    title: name,
    images: ['/og.png'],
  },
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <html lang='en'>
    <head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#1db954' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
        rel='stylesheet'
      />
    </head>
    <body>{children}</body>
    {GOOGLE_TAG_MANAGER_ID && (
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
    )}
  </html>
);

export default RootLayout;
