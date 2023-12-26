import { FC } from 'react';
import CloseIconButton from '@/components/UI/CloseIconButton/CloseIconButton';
import styles from './DocsHeader.module.scss';
import BackIconButton from '@/components/UI/BackIconButton/BackIconButton';

type DocsHeaderType = {
  titlePrevType: string;
  isRoot: boolean;
  handleBack: () => void;
  handleClose: () => void;
};

const DocsHeader: FC<DocsHeaderType> = ({ titlePrevType, handleClose, handleBack, isRoot }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttons_container}>
        <div className={styles.back_btn_container}>
          <div className={styles.back_btn} onClick={handleBack}>
            {isRoot && <BackIconButton />}
          </div>
          <p className={styles.title}>{titlePrevType}</p>
        </div>
        <div onClick={handleClose}>
          <CloseIconButton />
        </div>
      </div>
    </div>
  );
};

export default DocsHeader;
