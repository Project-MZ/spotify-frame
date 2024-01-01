import { SpotifyFrame } from '~/app/features/spotify';

const Home = (): JSX.Element => (
  <main className='flex min-h-screen flex-col items-center justify-between p-24'>
    <SpotifyFrame />
  </main>
);

export default Home;
