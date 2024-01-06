/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { ENDPOINT_KEY_LS, INITIAL_ENDPOINT, URL_REGEXP } from '@/constants/stringConstants';
import { Dispatch, FC, InputHTMLAttributes, SetStateAction, useEffect, useState } from 'react';
import useTranslation from '@/localization/useTranslation';
import BasicButton from '../common/BasicButton/BasicButton';
import cn from 'classnames';
import styles from './InputEndpoint.module.scss';
import { removeFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageService';

type InputEndpointType = {
  getEndpoint: (endpoint: string | null) => void;
  error?: boolean;
  setIsEndpointCorrect: (value: boolean) => void;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
} & InputHTMLAttributes<HTMLInputElement>;

const InputEndpoint: FC<InputEndpointType> = ({
  getEndpoint,
  error,
  setIsEndpointCorrect,
  setErrorMessage,
}) => {
  const storedEndpoint = localStorage.getItem('endpoint') || INITIAL_ENDPOINT;
  const [endpoint, setEndpoint] = useState<string | null>(storedEndpoint);
  const { register, handleSubmit } = useForm<endpointFormType>();

  const t = useTranslation();

  useEffect(() => {
    getEndpoint(storedEndpoint);
  }, [getEndpoint, storedEndpoint]);

  const handleChangeEndpoint = (data: endpointFormType): void => {
    const newEndpoint = data.endpoint;
    const regexp = new RegExp(URL_REGEXP);

    if (regexp.test(newEndpoint)) {
      setEndpoint(newEndpoint);
      saveToLocalStorage(ENDPOINT_KEY_LS, newEndpoint);
      getEndpoint(newEndpoint);
      setIsEndpointCorrect(true);
    } else {
      setEndpoint(null);
      removeFromLocalStorage(ENDPOINT_KEY_LS);
      getEndpoint(null);
      setIsEndpointCorrect(false);
      setErrorMessage(`${t['invalid endpoint']}`);
    }
  };

  return (
    <div className={styles.inputEndpoint_container}>
      <form
        action="submit"
        onSubmit={handleSubmit(handleChangeEndpoint)}
        className={styles.form_container}
      >
        <Input<endpointFormType>
          className={styles.input}
          register={register}
          name="endpoint"
          type="text"
          defaultValue={endpoint ? endpoint : ''}
          containerClassName={styles.input_container}
          fieldClassName={styles.input_field}
          focus={true}
        />
        <BasicButton className={styles.button}>{t['Change endpoint']}</BasicButton>
      </form>

      <p>
        <span>{t['Endpoint']}: </span>
        <span
          className={cn(
            styles.endpoint_text,
            endpoint && error ? styles.valid_color : styles.invalid_color
          )}
        >
          {endpoint ? endpoint : t['invalid endpoint']}
        </span>
      </p>
    </div>
  );
};

export default InputEndpoint;
