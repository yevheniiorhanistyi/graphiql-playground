import { FC, useState } from 'react';
import cn from 'classnames';

import LangButton from '../LanguageButton/LanguageButton';

import styles from './Nav.module.scss';
import Link from 'next/link';

const Nav: FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const onClickLanguageBtn = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  return (
    <nav className={styles.nav}>
      <LangButton isPopoverOpen={isPopoverOpen} onClickLanguageBtn={onClickLanguageBtn} />
      <Link href="/" className={styles.item}>
        <span className={styles.item_label}>Sign In</span>
      </Link>
      <button className={styles.item}>
        <span className={styles.item_label}>Sign Out</span>
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
