import NotFound from '@/components/NotFound/NotFound';
import Head from 'next/head';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
