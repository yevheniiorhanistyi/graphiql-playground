import { useState } from 'react';
import ToggleTheme from '../toggleTheme/ToggleTheme';
import LangButton from '@/components/LanguageButton/LanguageButton';
import styles from './ConfiguratorPanel.module.scss';
import cn from 'classnames';

const ConfiguratorPanel = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleOpen = () => {
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setPopoverOpen(false);
  };

  return (
    <div className={styles.configuratorPanel}>
      <ToggleTheme />
      <LangButton isPopoverOpen={isPopoverOpen} handleOpen={handleOpen} handleClose={handleClose} />
      <div
        className={cn(styles.backdrop, { [styles.backdrop_show]: isPopoverOpen })}
        onClick={handleClose}
        role="button"
        tabIndex={0}
        data-testid="backdrop"
      />
    </div>
  );
};

export default ConfiguratorPanel;
