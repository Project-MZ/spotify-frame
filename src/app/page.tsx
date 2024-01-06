import { SpotifyFrameBuilder } from '~/features/spotify';

const Page = (): JSX.Element => (
  <main className='flex min-h-screen flex-col items-center bg-white'>
    <SpotifyFrameBuilder />
  </main>
);

export default Page;
