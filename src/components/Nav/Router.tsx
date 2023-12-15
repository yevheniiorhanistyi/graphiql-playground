import BasicButton from '../common/BasicButton/BasicButton';

import { useRouter } from 'next/router';
import { Routes, URL_Queries } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import signOut from '../../utils/firebase/auth/signOut';
import useTranslation from '@/localization/useTranslation';

const Router = () => {
  const t = useTranslation();
  const router = useRouter();

  const { authUser } = useAuthContext();

  const handleAuth = (value: string) => {
    router.push({ pathname: Routes.AUTH_PAGE, query: { form: value } });
  };

  const navToPlayground = () => {
    router.push({ pathname: Routes.PLAYGROUND_PAGE });
  };

  const handleSignOut = async () => {
    await signOut();

    router.push({ pathname: Routes.WELCOME_PAGE });
  };

  return (
    <>
      {authUser ? (
        <>
          {router.pathname !== `/${Routes.PLAYGROUND_PAGE}` && (
            <BasicButton onClick={navToPlayground}>Playground</BasicButton>
          )}

          <BasicButton onClick={handleSignOut}>{t['Sign Out']}</BasicButton>
        </>
      ) : (
        <>
          <BasicButton onClick={() => handleAuth(URL_Queries.SIGNIN)}>{t['Sign In']}</BasicButton>

          <BasicButton onClick={() => handleAuth(URL_Queries.SIGNUP)}>{t['Sign Up']}</BasicButton>
        </>
      )}
    </>
  );
};

export default Router;
