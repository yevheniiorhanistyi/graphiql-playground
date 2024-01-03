import Image from 'next/image';
import styles from './NotFound.module.scss';
import BasicButton from '../common/BasicButton/BasicButton';
import { useRouter } from 'next/router';
import { Routes } from '@/constants/enums';
import useTranslation from '@/localization/useTranslation';

const NotFound = () => {
  const router = useRouter();

  const t = useTranslation();

  const handleClick = () => {
    router.push(Routes.WELCOME_PAGE);
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.not_found_image}
        width={421}
        height={205}
        src="/404_img.svg"
        alt="404 icon image"
      />
      <p className={styles.text}>{t['This page not found']}</p>
      <BasicButton onClick={handleClick} customStyles={{ width: '12rem' }}>
        {t['Home']}
      </BasicButton>
    </div>
  );
};

export default NotFound;
