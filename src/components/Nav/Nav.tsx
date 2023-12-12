import { FC } from 'react';
import Link from 'next/link';

import BasicButton from '../common/BasicButton/BasicButton';

import styles from './Nav.module.scss';

const Nav: FC = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        <BasicButton>Sign In</BasicButton>
      </Link>
      <BasicButton>Sign Out</BasicButton>
    </nav>
  );
};

export default Nav;
