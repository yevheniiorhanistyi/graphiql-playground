import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import useYupTranslations from '@/utils/FormsSchema';
import { signUpFormInterface } from '@/interfaces/formInterfaces';
import Input from '../Input/Input';
import { useRouter } from 'next/router';
import { Routes } from '@/constants/enums';
import signUp from '@/utils/firebase/auth/signUp';
import { Loader } from '../Loader/Loader';
import BasicButton from '../common/BasicButton/BasicButton';
import useTranslation from '@/localization/useTranslation';

const SignUpForm = () => {
  const t = useTranslation();
  const { signUpFormSchema } = useYupTranslations();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = async (data: signUpFormInterface) => {
    setIsLoading(true);

    try {
      const { error } = await signUp(data.email, data.password);

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
      <Input<signUpFormInterface>
        register={register}
        name="email"
        type="email"
        label={t['Email:']}
        errors={t[String(errors.email?.message)] || ''}
      />

      <Input<signUpFormInterface>
        register={register}
        name="password"
        type="password"
        label={t['Password:']}
        security="true"
        errors={t[String(errors.password?.message)] || ''}
      />

      <Input<signUpFormInterface>
        register={register}
        name="passwordConfirmation"
        type="password"
        label={t['Confirm Password:']}
        security="true"
        errors={t[String(errors.passwordConfirmation?.message)] || ''}
      />

      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}

      <BasicButton type="submit" disabled={!isValid} style={{ marginTop: '8px' }}>
        {isLoading ? <Loader /> : `${t['Submit']}`}
      </BasicButton>
    </form>
  );
};

export default SignUpForm;
