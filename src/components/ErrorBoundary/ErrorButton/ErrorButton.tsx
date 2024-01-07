import { SMTH_WENT_WRONG } from '@/constants/stringConstants';
import useTranslation from '@/localization/useTranslation';
import { FC, useEffect, useState } from 'react';

export const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const t = useTranslation();

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
      <button style={{ display: 'none' }} onClick={handleThrowError}>
        {t['Show Error']}
      </button>
    </div>
  );
};
