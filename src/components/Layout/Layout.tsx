import React, { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AuthContextProvider } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </AuthContextProvider>
  );
};

export default Layout;
