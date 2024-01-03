/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { INITIAL_ENDPOINT } from '@/constants/stringConstants';
import { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import useTranslation from '@/localization/useTranslation';
import BasicButton from '../common/BasicButton/BasicButton';
import styles from './InputEndpoint.module.scss';

type InputEndpointType = {
  getEndpoint: (endpoint: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const InputEndpoint: FC<InputEndpointType> = ({ getEndpoint }) => {
  const storedEndpoint = localStorage.getItem('endpoint') || INITIAL_ENDPOINT;
  const [endpoint, setEndpoint] = useState<string>(storedEndpoint);
  const { register, handleSubmit } = useForm<endpointFormType>();

  const t = useTranslation();

  useEffect(() => {
    getEndpoint(storedEndpoint);
  }, [getEndpoint, storedEndpoint]);

  const handleChangeEnpoint = (data: endpointFormType): void => {
    const newEndpoint = data.endpoint;
    setEndpoint(newEndpoint);
    localStorage.setItem('endpoint', newEndpoint);
    getEndpoint(newEndpoint);
  };

  return (
    <>
      <form
        action="submit"
        onSubmit={handleSubmit(handleChangeEnpoint)}
        className={styles.form_container}
      >
        <Input<endpointFormType>
          className={styles.input}
          register={register}
          name="endpoint"
          type="text"
          defaultValue={endpoint}
          containerClassName={styles.input_container}
          fieldClassName={styles.input_field}
          focus={true}
        />
        <BasicButton className={styles.button}>{t['Send']}</BasicButton>
      </form>

      <p>
        <span>{t['Endpoint']}: </span>
        <span>{endpoint}</span>
      </p>
    </>
  );
};

export default InputEndpoint;
