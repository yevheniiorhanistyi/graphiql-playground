import { SMTH_WENT_WRONG } from '@/constants/stringConstants';
import { FC, useEffect, useState } from 'react';

export const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (hasError) {
      throw new Error(SMTH_WENT_WRONG);
    }
  }, [hasError]);

  const handleThrowError = (): void => {
    setHasError((state) => !state);
  };

  return (
    <div className="wrapper">
      <button onClick={handleThrowError}>Show Error</button>
    </div>
  );
};
