import { Routes } from '@/constants/enums';
import { signInFormInterface } from '@/interfaces/formInterfaces';
import { signInFormSchema } from '@/utils/FormsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import signIn from '@/utils/firebase/auth/signIn';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';
import BasicButton from '../common/BasicButton/BasicButton';
import useTranslation from '@/localization/useTranslation';

const SignInForm = () => {
  const t = useTranslation();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

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
    setIsLoading(true);

    try {
      const { error } = await signIn(data.email, data.password);

      if (error) {
        setSubmitError(`${error}`);
      } else {
        router.push({ pathname: Routes.PLAYGROUND_PAGE });
        reset();
      }
    } catch (err) {
      setSubmitError('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <Input<signInFormInterface>
        register={register}
        name="email"
        type="email"
        label={t['Email:']}
        errors={t[String(errors.email?.message)] || ''}
      />

      <Input<signInFormInterface>
        register={register}
        name="password"
        type="password"
        label={t['Password:']}
        security="true"
        errors={t[String(errors.password?.message)] || ''}
      />

      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}

      <BasicButton type="submit" disabled={!isValid} style={{ marginTop: '8px' }}>
        {isLoading ? <Loader /> : `${t['Submit']}`}
      </BasicButton>
    </form>
  );
};

export default SignInForm;
