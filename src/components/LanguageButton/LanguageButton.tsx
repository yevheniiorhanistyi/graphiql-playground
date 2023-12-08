import React, { FC, MouseEvent } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './LanguageButton.module.scss';

type LangButtonProps = {
  isPopoverOpen: boolean;
  onClickLanguageBtn: () => void;
};

type LanguageItemProps = {
  flagSrc: string;
  languageText: string;
};

const LanguageItem: FC<LanguageItemProps> = ({ flagSrc, languageText }) => {
  const onClickLanguageItem = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
  };

  return (
    <li className={styles.langPopover_item} onClick={onClickLanguageItem}>
      <Image className={styles.flagIcon} width={28} height={20} src={flagSrc} alt="Language" />
      <span className={styles.languageText}>{languageText}</span>
    </li>
  );
};

const LangButton: FC<LangButtonProps> = ({ isPopoverOpen, onClickLanguageBtn }) => {
  const langEnSrc = '/en_flag.jpg';
  const langRuSrc = '/ru_flag.jpg';

  return (
    <button className={styles.langBtn} type="button" onClick={onClickLanguageBtn}>
      <Image width={38} height={24} src={langEnSrc} alt="Language" />
      <ul className={cn(styles.langPopover, { [styles.openPopover]: isPopoverOpen })}>
        <LanguageItem flagSrc={langEnSrc} languageText="English" />
        <LanguageItem flagSrc={langRuSrc} languageText="Russian" />
      </ul>
    </button>
  );
};

export default LangButton;
