import { getAuth } from 'firebase/auth';
import firebase_app from '../config';

const auth = getAuth(firebase_app);

const signOut = async () => {
  let result = null,
    error = null;
  try {
    result = await auth.signOut();
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signOut;
