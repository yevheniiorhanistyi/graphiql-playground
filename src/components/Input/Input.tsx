import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

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
    <div className={styles.input_container}>
      <div className={styles.input_content}>
        <label htmlFor={name} className={styles.input_label}>
          {label}
        </label>
        <input
          {...register(name as Path<T>)}
          className={styles.input_field}
          type={type}
          name={name}
          security={security}
        />
      </div>
      {!!errors.length && <p className={styles.input_error}>{errors}</p>}
    </div>
  );
};

export default Input;
