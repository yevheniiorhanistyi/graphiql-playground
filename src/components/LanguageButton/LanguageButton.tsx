import React, { FC, MouseEvent, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './LanguageButton.module.scss';

type LangButtonProps = {
  isPopoverOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const LangButton: FC<LangButtonProps> = ({ isPopoverOpen, handleOpen, handleClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const langEnSrc = '/en_flag.svg';
  const langRuSrc = '/ru_flag.svg';

  const onItemClick = (e: MouseEvent<HTMLLIElement>, language: string) => {
    e.stopPropagation();
    setSelectedLanguage(language);
    handleClose();
  };

  return (
    <button className={styles.langBtn} type="button" onClick={handleOpen}>
      <Image
        width={38}
        height={24}
        src={selectedLanguage === 'English' ? langEnSrc : langRuSrc}
        alt="Language"
      />
      <ul className={cn(styles.langPopover, { [styles.openPopover]: isPopoverOpen })}>
        <li className={styles.langPopover_item} onClick={(e) => onItemClick(e, 'English')}>
          <Image
            className={styles.flagIcon}
            width={28}
            height={20}
            src={langEnSrc}
            alt="Language"
          />
          <span className={styles.languageText}>English</span>
        </li>
        <li className={styles.langPopover_item} onClick={(e) => onItemClick(e, 'Russian')}>
          <Image
            className={styles.flagIcon}
            width={28}
            height={20}
            src={langRuSrc}
            alt="Language"
          />
          <span className={styles.languageText}>Russian</span>
        </li>
      </ul>
    </button>
  );
};

export default LangButton;
