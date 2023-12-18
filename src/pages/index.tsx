import Head from 'next/head';
import Welcome from './welcome';

export default function MainPage() {
  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Welcome />
      </div>
    </>
  );
}
