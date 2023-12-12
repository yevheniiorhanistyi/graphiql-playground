import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './BasicButton.module.scss';

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

const BasicButton: FC<BasicButtonProps> = ({ children, active, ...props }) => (
  <button {...props} className={`${styles.button} ${active ? styles.active : ''}`}>
    <span className={styles.button_label}>{children}</span>
  </button>
);

export default BasicButton;
