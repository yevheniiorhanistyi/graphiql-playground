import { FC, useState } from 'react';
import cn from 'classnames';

import LangButton from '../LanguageButton/LanguageButton';

import styles from './Nav.module.scss';
import { useRouter } from 'next/router';
import { Routes, URL_Queries } from '@/constants/enums';

const Nav: FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const onClickLanguageBtn = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const router = useRouter();

  const handleAuth = (value: string) => {
    router.push({ pathname: Routes.AUTH_PAGE, query: { form: value } });
  };

  return (
    <nav className={styles.nav}>
      <LangButton isPopoverOpen={isPopoverOpen} onClickLanguageBtn={onClickLanguageBtn} />
      <button className={styles.item} onClick={() => handleAuth(URL_Queries.SIGNIN)}>
        <span className={styles.item_label}>Sign In</span>
      </button>
      <button className={styles.item} onClick={() => handleAuth(URL_Queries.SIGNUP)}>
        <span className={styles.item_label}>Sign Up</span>
      </button>
      <div
        className={cn(styles.backdrop, { [styles.backdrop_show]: isPopoverOpen })}
        onClick={() => setPopoverOpen(false)}
        role="button"
        tabIndex={0}
        data-testid="backdrop"
      />
    </nav>
  );
};

export default Nav;
