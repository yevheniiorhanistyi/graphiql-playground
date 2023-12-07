import Head from 'next/head';
import Link from 'next/link';

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
        <h1>GraphQL App</h1>
        <Link href="/playground">Go to Playground page</Link>
      </div>
    </>
  );
}
