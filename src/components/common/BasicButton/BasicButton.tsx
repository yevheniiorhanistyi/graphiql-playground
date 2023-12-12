import { FC, ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './BasicButton.module.scss';

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
  customStyles?: CSSProperties;
}

const BasicButton: FC<BasicButtonProps> = ({ children, active, customStyles, ...props }) => (
  <button
    {...props}
    className={`${styles.button} ${active ? styles.active : ''}`}
    style={customStyles}
    type={props.type}
  >
    <span className={styles.button_label}>{children}</span>
  </button>
);

export default BasicButton;
