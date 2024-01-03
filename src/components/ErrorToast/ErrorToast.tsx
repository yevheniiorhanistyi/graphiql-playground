import { Dispatch, FC, SetStateAction, useEffect } from 'react';

type ErrorToastType = {
  errorDescription: string;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};

const ErrorToast: FC<ErrorToastType> = ({ errorDescription, setErrorMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }, [setErrorMessage]);

  const handleClose = () => {
    setErrorMessage(null);
  };

  return (
    <div>
      <button onClick={handleClose}>x</button>
      <p>Error</p>
      <p>{errorDescription}</p>
    </div>
  );
};

export default ErrorToast;
