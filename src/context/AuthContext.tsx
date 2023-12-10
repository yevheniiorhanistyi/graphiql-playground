/* eslint-disable react-hooks/exhaustive-deps */
import firebase_app from '@/utils/firebase/config';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const auth = getAuth(firebase_app);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log('user from provider ', user);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
