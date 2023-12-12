import React, { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="wrapper">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
