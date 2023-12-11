/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, URL_Queries } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (!authUser && !isLoading && router.pathname === `/${Routes.PLAYGROUND_PAGE}`) {
      router.push({ pathname: Routes.WELCOME_PAGE });
    }
    if (
      !authUser &&
      !isLoading &&
      router.pathname === `/${Routes.AUTH_PAGE}` &&
      !router.query.form
    ) {
      router.push({ pathname: Routes.AUTH_PAGE, query: { form: URL_Queries.SIGNIN } });
    }
    if (authUser && !isLoading && router.pathname === `/${Routes.AUTH_PAGE}`) {
      router.push({ pathname: Routes.PLAYGROUND_PAGE });
    }
  }, [isLoading]);

  return <div>{isLoading ? <p>LOADING...</p> : children}</div>;
};

export default ProtectedRoute;
