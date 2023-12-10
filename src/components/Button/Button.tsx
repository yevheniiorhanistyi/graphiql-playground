import { FC } from 'react';
import styles from './Button.module.scss';

type ButtonType = {
  text: string;
  type: 'submit' | 'reset' | 'button';
  disabled: boolean;
  action?: () => void;
};

const Button: FC<ButtonType> = ({ text, type, action, disabled = false }) => {
  return (
    <button className={styles.btn} onClick={action} type={type} disabled={disabled}>
      <span className={styles.btn_text}>{text}</span>
    </button>
  );
};

export default Button;
