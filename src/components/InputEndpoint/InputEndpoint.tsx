/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { INITIAL_ENDPOINT } from '@/constants/stringConstants';
import { FC, useEffect, useState } from 'react';

type InputEndpointType = {
  getEndpoint: (endpoint: string) => void;
};

const InputEndpoint: FC<InputEndpointType> = ({ getEndpoint }) => {
  const [endpoint, setEndpoint] = useState<string>(INITIAL_ENDPOINT);
  const { register, handleSubmit } = useForm<endpointFormType>();

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
            label="Endpoint: "
            name="endpoint"
            type="text"
            placeholder={endpoint}
          />
          <button type="submit">submit</button>
        </form>
      </div>

      <p>
        <span>Endpoint: </span>
        <span>{endpoint}</span>
      </p>
    </div>
  );
};

export default InputEndpoint;
