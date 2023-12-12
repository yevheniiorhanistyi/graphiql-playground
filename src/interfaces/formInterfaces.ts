import { signInFormSchema, signUpFormSchema } from '@/utils/FormsSchema';
import * as yup from 'yup';

export type signInFormInterface = yup.InferType<typeof signInFormSchema>;
export type signUpFormInterface = yup.InferType<typeof signUpFormSchema>;
