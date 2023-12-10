import { Routes } from '@/constants/enums';
import { signInFormInterface } from '@/interfaces/formInterfaces';
import { signInFormSchema } from '@/utils/FormsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import signIn from '@/utils/firebase/auth/signIn';
import Button from '../Button/Button';

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<signInFormInterface>({
    mode: 'onChange',
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (data: signInFormInterface) => {
    console.log(data);
    const { result, error } = await signIn(data.email, data.password);
    console.log('result ', result, 'error ', error);

    if (!error) {
      router.push({ pathname: Routes.PLAYGROUND_PAGE });

      setTimeout(() => {
        reset();
      }, 1000);
    }
  };

  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <Input<signInFormInterface>
        register={register}
        name="email"
        type="email"
        label="Email:"
        errors={errors.email?.message || ''}
      />

      <Input<signInFormInterface>
        register={register}
        name="password"
        type="password"
        label="Password:"
        security="true"
        errors={errors.password?.message || ''}
      />
      <Button text="Submit" type="submit" disabled={!isValid} />
    </form>
  );
};

export default SignInForm;
