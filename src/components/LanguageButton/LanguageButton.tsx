import React, { FC, MouseEvent } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './LanguageButton.module.scss';
import useLocale from '@/localization/useLocale';
import useTranslation from '@/localization/useTranslation';

type LangButtonProps = {
  isPopoverOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

type LanguageOptions = {
  [key: string]: string;
};

const LangButton: FC<LangButtonProps> = ({ isPopoverOpen, handleOpen, handleClose }) => {
  const { locale, toggleLocale } = useLocale();
  const t = useTranslation();

  const langSrc: LanguageOptions = {
    en: '/en_flag.svg',
    ru: '/ru_flag.svg',
  };

  const onItemClick = (e: MouseEvent<HTMLLIElement>, lang: string) => {
    e.stopPropagation();
    toggleLocale(lang);
    handleClose();
  };

  return (
    <button
      className={styles.langBtn}
      type="button"
      onClick={handleOpen}
      data-testid="language-button"
    >
      {locale && (
        <Image
          width={38}
          height={24}
          src={langSrc[locale as keyof LanguageOptions]}
          alt={t['Language']}
        />
      )}
      <ul className={cn(styles.langPopover, { [styles.openPopover]: isPopoverOpen })}>
        {Object.entries(langSrc).map(([key, value]) => (
          <li key={key} className={styles.langPopover_item} onClick={(e) => onItemClick(e, key)}>
            <Image className={styles.flagIcon} width={28} height={20} src={value} alt={t[key]} />
            <span className={styles.languageText}>{t[key]}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};

export default LangButton;
