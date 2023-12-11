import { FC, useState } from 'react';
import cn from 'classnames';

import LangButton from '../LanguageButton/LanguageButton';

import styles from './Nav.module.scss';
import { useRouter } from 'next/router';
import { Routes, URL_Queries } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import signOut from '../../utils/firebase/auth/signOut';

const Nav: FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  const router = useRouter();

  // console.log('context from nav');
  const { authUser } = useAuthContext();

  const handleAuth = (value: string) => {
    router.push({ pathname: Routes.AUTH_PAGE, query: { form: value } });
  };

  const navToPlayground = () => {
    router.push({ pathname: Routes.PLAYGROUND_PAGE });
  };

  const handleSignOut = async () => {
    const { result, error } = await signOut();
    console.log('logout user ', result, 'logout error ', error);
    router.push({ pathname: Routes.WELCOME_PAGE });
  };

  return (
    <nav className={styles.nav}>
      <LangButton isPopoverOpen={isPopoverOpen} handleOpen={handleOpen} handleClose={handleClose} />
      {authUser ? (
        <>
          {router.pathname !== `/${Routes.PLAYGROUND_PAGE}` && (
            <button className={styles.item} onClick={navToPlayground}>
              <span className={styles.item_label}>Playground</span>
            </button>
          )}
          <button className={styles.item} onClick={handleSignOut}>
            <span className={styles.item_label}>Sign Out</span>
          </button>
        </>
      ) : (
        <>
          <button className={styles.item} onClick={() => handleAuth(URL_Queries.SIGNIN)}>
            <span className={styles.item_label}>Sign In</span>
          </button>
          <button className={styles.item} onClick={() => handleAuth(URL_Queries.SIGNUP)}>
            <span className={styles.item_label}>Sign Up</span>
          </button>
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
