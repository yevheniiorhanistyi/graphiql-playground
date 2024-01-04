import cn from 'classnames';
import styles from './Fallback.module.scss';
import { FC } from 'react';
import Image from 'next/image';
import broken_app_icon from '../../../../public/broken-screen.png';
import { SMTH_WENT_WRONG, TRY_AGAIN } from '@/constants/stringConstants';

export const Fallback: FC = () => {
  const handleReloadPage = (): void => {
    window.location.reload();
  };

  return (
    <div className={cn(styles.fallback_container, 'wrapper')}>
      <div className={styles.fallback_content}>
        <Image
          className={styles.img}
          width={420}
          height={300}
          alt={SMTH_WENT_WRONG}
          src={broken_app_icon}
        />
        <p className={styles.warning_message}>{SMTH_WENT_WRONG}</p>
      </div>
      <button className={styles.back_button} onClick={handleReloadPage}>
        {TRY_AGAIN}
      </button>
    </div>
  );
};
