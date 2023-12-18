import React, { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useTheme from '@/theme/useTheme';
import cn from 'classnames';
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={cn('app', theme)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
