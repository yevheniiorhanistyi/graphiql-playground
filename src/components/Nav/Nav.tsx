import { FC, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import LangButton from '../LanguageButton/LanguageButton';
import BasicButton from '../common/BasicButton/BasicButton';

import styles from './Nav.module.scss';
import ToggleTheme from '../UI/toggleTheme/ToggleTheme';

const Nav: FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <ToggleTheme />
      <LangButton isPopoverOpen={isPopoverOpen} handleOpen={handleOpen} handleClose={handleClose} />
      <Link href="/" className={styles.link}>
        <BasicButton>Sign In</BasicButton>
      </Link>
      <BasicButton>Sign Out</BasicButton>
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
