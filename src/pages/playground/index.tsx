import InputEndpoint from '@/components/InputEndpoint/InputEndpoint';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Head from 'next/head';

export default function Playground() {
  return (
    <ProtectedRoute>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>GraphiQL Playground Page</div>
      <InputEndpoint />
    </ProtectedRoute>
  );
}
