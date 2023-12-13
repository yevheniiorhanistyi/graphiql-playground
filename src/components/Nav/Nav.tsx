import { FC } from 'react';

import BasicButton from '../common/BasicButton/BasicButton';

import styles from './Nav.module.scss';
import { useRouter } from 'next/router';
import { Routes, URL_Queries } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import signOut from '../../utils/firebase/auth/signOut';

const Nav: FC = () => {
  const router = useRouter();

  const { authUser } = useAuthContext();

  const handleAuth = (value: string) => {
    router.push({ pathname: Routes.AUTH_PAGE, query: { form: value } });
  };

  const navToPlayground = () => {
    router.push({ pathname: Routes.PLAYGROUND_PAGE });
  };

  const handleSignOut = async () => {
    await signOut();

    router.push({ pathname: Routes.WELCOME_PAGE });
  };

  return (
    <nav className={styles.nav}>
      {authUser ? (
        <>
          {router.pathname !== `/${Routes.PLAYGROUND_PAGE}` && (
            <BasicButton onClick={navToPlayground}>Playground</BasicButton>
          )}

          <BasicButton onClick={handleSignOut}>Sign Out</BasicButton>
        </>
      ) : (
        <>
          <BasicButton onClick={() => handleAuth(URL_Queries.SIGNIN)}>Sign In</BasicButton>

          <BasicButton onClick={() => handleAuth(URL_Queries.SIGNUP)}>Sign Up</BasicButton>
        </>
      )}
    </nav>
  );
};

export default Nav;
