import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../Nav/Nav';
import cn from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const logoSrc = '/pngwing.com.png';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeSticky = scrollPosition > 0;

      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(styles.header, { [styles.sticky]: isSticky })}>
      <div className={cn(styles.header_wrapper, 'wrapper')}>
        <Link className={styles.logoLink} href="/">
          <Image
            className={styles.appLogo}
            width={32}
            height={32}
            src={logoSrc}
            alt="Graphql logo"
          />
          <h2 className={styles.appName}>GraphiQL</h2>
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
