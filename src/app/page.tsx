import { SpotifyFrameBuilder } from '~/features/spotify';

const Page = (): JSX.Element => (
  <main className='flex min-h-screen flex-col items-center bg-white px-8 py-16 md:px-16 lg:px-32'>
    <SpotifyFrameBuilder />
  </main>
);

export default Page;
