import ToggleTheme from '../UI/toggleTheme/ToggleTheme';
import styles from './Header.module.scss';
import cn from 'classnames';

const Header = () => {
  return (
    <header className={cn(styles.header_wrapper, 'wrapper')}>
      <h2>Header</h2>
      <ToggleTheme />
    </header>
  );
};

export default Header;
