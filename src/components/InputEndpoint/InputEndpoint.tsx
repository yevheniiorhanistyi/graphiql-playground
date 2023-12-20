/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { INITIAL_ENDPOINT } from '@/constants/stringConstants';
import { FC, useEffect, useState } from 'react';
import BasicButton from '../common/BasicButton/BasicButton';
import useTranslation from '@/localization/useTranslation';
import styles from './InputEndpoint.module.scss';

type InputEndpointType = {
  getEndpoint: (endpoint: string) => void;
};

const InputEndpoint: FC<InputEndpointType> = ({ getEndpoint }) => {
  const [endpoint, setEndpoint] = useState<string>(INITIAL_ENDPOINT);
  const { register, handleSubmit } = useForm<endpointFormType>();

  const t = useTranslation();

  useEffect(() => {
    getEndpoint(INITIAL_ENDPOINT);
  }, [getEndpoint]);

  const handleChangeEnpoint = (data: endpointFormType): void => {
    setEndpoint(data.endpoint);
    getEndpoint(data.endpoint);
  };

  return (
    <div>
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
        />
        <BasicButton className={styles.button}>{t['Send']}</BasicButton>
      </form>
    </div>
  );
};

export default InputEndpoint;
