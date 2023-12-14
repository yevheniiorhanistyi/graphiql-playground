import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { endpointFormType } from '@/interfaces/formInterfaces';
import { initialGraphQLRequest } from '@/utils/graphQL_API/initialGraphQLRequest';
import { INITIAL_ENDPOINT } from '@/constants/stringConstants';

const InputEndpoint = () => {
  const { register, handleSubmit } = useForm<endpointFormType>();

  const handleChangeEnpoint = (data: endpointFormType) => {
    initialGraphQLRequest(data.endpoint);
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
