import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';
import { InputHTMLAttributes } from 'react';
import cn from 'classnames';

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  label?: string;
  name: string;
  type: string;
  security?: string;
  defaultValue?: string;
  placeholder?: string;
  errors?: string;
  containerClassName?: string;
  fieldClassName?: string;
  focus?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>({
  register,
  label,
  name,
  type,
  security,
  errors,
  defaultValue,
  containerClassName,
  fieldClassName,
  placeholder,
  focus,
}: InputProps<T>) => {
  return (
    <div className={cn(styles.input_container, containerClassName)}>
      <div className={styles.input_content}>
        {label != null && (
          <label htmlFor={name} className={styles.input_label}>
            {label}
          </label>
        )}
        <input
          {...register(name as Path<T>)}
          className={cn(styles.input_field, fieldClassName)}
          data-testid="endpoint"
          type={type}
          name={name}
          security={security}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onFocus={(e) => {
            if (focus) {
              e.target.select();
            }
          }}
        />
      </div>
      {!!errors?.length && <p className={styles.input_error}>{errors}</p>}
    </div>
  );
};

export default Input;
