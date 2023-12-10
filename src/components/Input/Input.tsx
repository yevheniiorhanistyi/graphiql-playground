import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  label: string;
  name: string;
  type: string;
  security?: string;
  errors: string;
};

const Input = <T extends FieldValues>({
  register,
  label,
  name,
  type,
  security,
  errors,
}: InputProps<T>) => {
  return (
    <>
      <div>
        <label htmlFor={name}>{label}</label>
        <input {...register(name as Path<T>)} type={type} name={name} security={security} />
      </div>
      <p>{errors}</p>
    </>
  );
};

export default Input;
