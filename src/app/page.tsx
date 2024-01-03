import { SpotifyFrame } from '~/features/spotify';

const Page = (): JSX.Element => (
  <main className='flex min-h-screen flex-col items-center bg-gray-200'>
    <header>header</header>
    <section className='grid h-full w-full grow grid-cols-1 md:grid-cols-2'>
      <div className='grid place-content-center p-8 md:p-16'>asdf</div>
      <div className='grid place-content-center p-8 md:p-16'>
        <SpotifyFrame />
      </div>
    </section>
    <footer>footer</footer>
  </main>
);

export default Page;
