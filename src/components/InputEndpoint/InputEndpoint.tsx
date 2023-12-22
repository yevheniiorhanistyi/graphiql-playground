/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { INITIAL_ENDPOINT } from '@/constants/stringConstants';
import { FC, useEffect, useState } from 'react';
import useTranslation from '@/localization/useTranslation';

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
    <div style={{ width: '40rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <form action="submit" onSubmit={handleSubmit(handleChangeEnpoint)}>
          <Input<endpointFormType>
            register={register}
            label={`${t['Endpoint']}: `}
            name="endpoint"
            type="text"
            placeholder={endpoint}
          />
          <button type="submit">{t['Submit']}</button>
        </form>
      </div>

      <p>
        <span>{t['Endpoint']}: </span>
        <span>{endpoint}</span>
      </p>
    </div>
  );
};

export default InputEndpoint;
