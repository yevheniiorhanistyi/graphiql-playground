/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { INITIAL_ENDPOINT } from '@/constants/stringConstants';
import { FC } from 'react';

type InputEndpointType = {
  getEndpoint: (endpoint: string) => void;
};

const InputEndpoint: FC<InputEndpointType> = ({ getEndpoint }) => {
  const { register, handleSubmit } = useForm<endpointFormType>();

  const handleChangeEnpoint = (data: endpointFormType): void => {
    getEndpoint(data.endpoint);
  };

  return (
    <div style={{ width: '40rem' }}>
      <form
        style={{ display: 'flex' }}
        action="submit"
        onSubmit={handleSubmit(handleChangeEnpoint)}
      >
        <Input<endpointFormType>
          register={register}
          label="Endpoint: "
          name="endpoint"
          type="text"
          defaultValue={INITIAL_ENDPOINT}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default InputEndpoint;
