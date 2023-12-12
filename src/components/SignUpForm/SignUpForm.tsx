import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { signUpFormSchema } from '@/utils/FormsSchema';
import { signUpFormInterface } from '@/interfaces/formInterfaces';
import Input from '../Input/Input';
import { useRouter } from 'next/router';
import { Routes } from '@/constants/enums';
import signUp from '@/utils/firebase/auth/signUp';
import { Loader } from '../Loader/Loader';
import BasicButton from '../common/BasicButton/BasicButton';

const SignUpForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const { result, error } = await signUp(data.email, data.password);
    console.log('result ', result, 'error ', error);

    if (!error) {
      router.push({ pathname: Routes.PLAYGROUND_PAGE });

      reset();
    }

    setIsLoading(false);
  };

  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <Input<signUpFormInterface>
        register={register}
        name="email"
        type="email"
        label="Email: "
        errors={errors.email?.message || ''}
      />

      <Input<signUpFormInterface>
        register={register}
        name="password"
        type="password"
        label="Password: "
        security="true"
        errors={errors.password?.message || ''}
      />

      <Input<signUpFormInterface>
        register={register}
        name="passwordConfirmation"
        type="password"
        label="Confirm password: "
        security="true"
        errors={errors.passwordConfirmation?.message || ''}
      />

      <BasicButton type="submit" disabled={!isValid}>
        {isLoading ? <Loader /> : 'Submit'}
      </BasicButton>
    </form>
  );
};

export default SignUpForm;
