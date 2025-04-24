import { FC, HTMLAttributes } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Loader: FC<LoaderProps> = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
};
