import { signUpFormInterface } from '@/interfaces/formInterfaces';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  register: UseFormRegister<signUpFormInterface>;
  label: string;
  name: 'email' | 'password' | 'passwordConfirmation';
  type: string;
  security?: string;
  errors: string;
};

const Input: FC<InputProps> = ({ register, label, name, type, security, errors }) => {
  return (
    <>
      <div>
        <label htmlFor={name}>{label}</label>
        <input {...register(name)} type={type} name={name} security={security} />
      </div>
      <p>{errors}</p>
    </>
  );
};

export default Input;
