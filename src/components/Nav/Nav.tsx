import { FC } from 'react';
import Link from 'next/link';

import BasicButton from '../common/BasicButton/BasicButton';

import styles from './Nav.module.scss';
import useTranslation from '@/localization/useTranslation';

const Nav: FC = () => {
  const t = useTranslation();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        <BasicButton>{t['Sign in']}</BasicButton>
      </Link>
      <BasicButton>{t['Sign out']}</BasicButton>
    </nav>
  );
};

export default Nav;
