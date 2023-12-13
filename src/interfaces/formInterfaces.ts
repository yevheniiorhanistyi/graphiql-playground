export type signInFormInterface = {
  email: string;
  password: string;
};

export type signUpFormInterface = signInFormInterface & {
  passwordConfirmation: string;
};
