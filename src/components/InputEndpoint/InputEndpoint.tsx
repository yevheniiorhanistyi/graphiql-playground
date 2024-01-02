/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { INITIAL_ENDPOINT, URL_REGEXP } from '@/constants/stringConstants';
import { FC, useEffect, useState } from 'react';
import useTranslation from '@/localization/useTranslation';
import cn from 'classnames';
import styles from './InputEndpoint.module.scss';

type InputEndpointType = {
  getEndpoint: (endpoint: string | null) => void;
};

const InputEndpoint: FC<InputEndpointType> = ({ getEndpoint }) => {
  const [endpoint, setEndpoint] = useState<string | null>(INITIAL_ENDPOINT);
  const { register, handleSubmit } = useForm<endpointFormType>();

  const t = useTranslation();

  useEffect(() => {
    getEndpoint(INITIAL_ENDPOINT);
  }, [getEndpoint]);

  const handleChangeEndpoint = (data: endpointFormType): void => {
    const regexp = new RegExp(URL_REGEXP);
    if (regexp.test(data.endpoint)) {
      setEndpoint(data.endpoint);
      getEndpoint(data.endpoint);
    } else {
      setEndpoint(null);
      getEndpoint(null);
    }
  };

  return (
    <div style={{ width: '40rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <form action="submit" onSubmit={handleSubmit(handleChangeEndpoint)}>
          <Input<endpointFormType>
            register={register}
            label={`${t['Endpoint']}: `}
            name="endpoint"
            type="text"
            placeholder={endpoint ? endpoint : ''}
          />
          <button type="submit">{t['Submit']}</button>
        </form>
      </div>

      <p>
        <span>{t['Endpoint']}: </span>
        <span
          className={cn(styles.endpoint_text, endpoint ? styles.valid_color : styles.invalid_color)}
        >
          {endpoint ? endpoint : t['invalid endpoint']}
        </span>
      </p>
    </div>
  );
};

export default InputEndpoint;
