import { FC, ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import styles from './BasicButton.module.scss';
import cn from 'classnames';

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
  customStyles?: CSSProperties;
}

const BasicButton: FC<BasicButtonProps> = ({ children, active, customStyles, ...props }) => (
  <button
    {...props}
    className={cn(
      `${styles.button} ${active ? styles.active : ''}`,
      `${props.type === 'submit' ? styles.button_submit : ''}`
    )}
    style={customStyles}
    type={props.type}
  >
    <span
      className={cn(styles.button_label, props.type === 'submit' ? styles.button_submit_text : '')}
    >
      {children}
    </span>
  </button>
);

export default BasicButton;
