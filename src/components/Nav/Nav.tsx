import { FC, useState } from 'react';
import cn from 'classnames';

import BasicButton from '../common/BasicButton/BasicButton';

import styles from './Nav.module.scss';
import { useRouter } from 'next/router';
import { Routes, URL_Queries } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import signOut from '../../utils/firebase/auth/signOut';
import LangButton from '../LanguageButton/LanguageButton';

const Nav: FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

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

      <div
        className={cn(styles.backdrop, { [styles.backdrop_show]: isPopoverOpen })}
        onClick={handleClose}
        role="button"
        tabIndex={0}
        data-testid="backdrop"
      />
    </nav>
  );
};

export default Nav;
