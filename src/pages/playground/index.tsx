import { Routes } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Playground = () => {
  const router = useRouter();

  const user = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push({ pathname: Routes.WELCOME_PAGE });
    }
  }, [router, user]);

  return <div>GraphiQL Playground Page</div>;
};

export default Playground;
