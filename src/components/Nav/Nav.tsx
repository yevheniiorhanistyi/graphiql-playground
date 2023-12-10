import { FC, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import LangButton from '../LanguageButton/LanguageButton';

import styles from './Nav.module.scss';

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
      <LangButton isPopoverOpen={isPopoverOpen} handleOpen={handleOpen} handleClose={handleClose} />
      <Link href="/" className={styles.item}>
        <span className={styles.item_label}>Sign In</span>
      </Link>
      <button className={styles.item}>
        <span className={styles.item_label}>Sign Out</span>
      </button>
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
