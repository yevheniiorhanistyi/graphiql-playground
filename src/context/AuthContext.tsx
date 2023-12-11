import firebase_app from '@/utils/firebase/config';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextValueType = {
  authUser: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValueType>({ authUser: null, isLoading: false });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const auth = getAuth(firebase_app);

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const authContextValue = {
    authUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {isLoading ? <p className="wrapper">LOADING...</p> : children}
    </AuthContext.Provider>
  );
};
