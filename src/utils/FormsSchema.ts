import useTranslation from '@/localization/useTranslation';
import * as yup from 'yup';

const useYupTranslations = () => {
  const t = useTranslation();

  const signInFormSchema = yup.object().shape({
    email: yup
      .string()
      .required(`${t['Please enter e-mail']}`)
      .matches(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/g, `${t['Please enter e-mail in valid format']}`),
    password: yup
      .string()
      .required(`${t['Please enter password']}`)
      .min(8, `${t['Password should be more than 8 characters']}`),
  });

  const signUpFormSchema = signInFormSchema.shape({
    password: yup
      .string()
      .required(`${t['Please enter password']}`)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.*[?^\x00-\x7F]).{8,32}$/,
        `${t['Password is not strong enough. Please use a stronger one']}`
      )
      .min(8, `${t['Password should be more than 8 characters']}`)
      .max(32, `${t['Password should be less than 32 characters']}`)
      .matches(/[A-Z]/, `${t['Password should contain at least 1 uppercase letter']}`)
      .matches(/[a-z]/, `${t['Password should contain at least 1 lowercase letter']}`)
      .matches(/[0-9]/, `${t['Password should contain at least 1 number']}`)
      .matches(/[@$!%*?&]/, `${t['Password should contain at least 1 special character']}`),
    passwordConfirmation: yup
      .string()
      .required(`${t['Please repeat the password']}`)
      .oneOf([yup.ref(`${t['Password']}`)], `${t['Passwords do not match. Please try again']}`),
  });

  return { signInFormSchema, signUpFormSchema };
};

export default useYupTranslations;
