import { Theme } from '@/theme/ThemeContext';
import useTheme from '@/theme/useTheme';
import { IconTheme } from './IconTheme';
import classes from './ToggleTheme.module.scss';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={classes.toggleTheme} onClick={toggleTheme}>
      {theme === Theme.LIGHT ? IconTheme.DARK : IconTheme.LIGHT}
    </button>
  );
};

export default ToggleTheme;
