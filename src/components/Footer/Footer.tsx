import styles from './Footer.module.scss';
import cn from 'classnames';
import LogoRsSchool from '../UI/LogoRsSchool/LogoRsSchool';
import useTranslation from '@/localization/useTranslation';

const Footer = () => {
  const t = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={cn(styles.footer_wrapper, 'wrapper')}>
        <div className={styles.innerBox}>
          <div className={styles.authors}>
            <a
              className={styles.authors_link}
              href="https://github.com/vladimirm89"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t['Uladzimir Milasheuski']}
            </a>
            <a
              className={styles.authors_link}
              href="https://github.com/stanislavstranger"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t['Stanislav Goloborodov']}
            </a>
            <a
              className={styles.authors_link}
              href="https://github.com/yevheniiorhanistyi"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t['Yevhenii Orhanistyi']}
            </a>
          </div>
          <p className={styles.copyright}>2023 GraphiQL</p>
        </div>
        <a className={styles.logo} href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <LogoRsSchool />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
