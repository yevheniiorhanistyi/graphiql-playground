import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import styles from './ErrorToast.module.scss';
import ErrorIcon from '../UI/ErrorIcon/ErrorIcon';
import cn from 'classnames';

type ErrorToastType = {
  errorDescription: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  errorMessage: string | null;
};

const ErrorToast: FC<ErrorToastType> = ({ errorDescription, setErrorMessage, errorMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [errorMessage, setErrorMessage]);

  const handleClose = () => {
    setErrorMessage(null);
  };

  return (
    <div
      className={cn(
        styles.error_toast_container,
        errorMessage ? styles.show_toast : styles.hide_toast
      )}
    >
      <div className={styles.error_toast_content}>
        <ErrorIcon />
        <p className={styles.error_toast_text}>{errorDescription}</p>
      </div>
      <button className={styles.close_btn} onClick={handleClose}>
        &#10005;
      </button>
    </div>
  );
};

export default ErrorToast;
