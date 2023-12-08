import styles from './Footer.module.scss';
import cn from 'classnames';

const Footer = () => {
  return (
    <footer className={cn(styles.footer_wrapper, 'wrapper')}>
      <h2>Footer</h2>
    </footer>
  );
};

export default Footer;
