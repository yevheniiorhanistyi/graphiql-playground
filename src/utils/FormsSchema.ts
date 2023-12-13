import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter e-mail')
    .matches(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter e-mail in valid format'),
  password: yup
    .string()
    .required('Please enter password')
    .min(8, 'Password should be more than 8 characters'),
});

export const signUpFormSchema = signInFormSchema.shape({
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.*[?^\x00-\x7F]).{8,32}$/,
      'Password is not strong enough. Please use a stronger one'
    )
    .min(8, 'Password should be more than 8 characters')
    .max(32, 'Password should be less than 32 characters')
    .matches(/[A-Z]/, 'Password should contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password should contain at least 1 lowercase letter')
    .matches(/[0-9]/, 'Password should contain at least 1 number')
    .matches(/[@$!%*?&]/, 'Password should contain at least 1 special character'),
  passwordConfirmation: yup
    .string()
    .required('Please repeat the password')
    .oneOf([yup.ref('password')], 'Passwords do not match. Please try again'),
});
