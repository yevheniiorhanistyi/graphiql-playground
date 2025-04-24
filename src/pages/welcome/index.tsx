import { FC } from 'react';
import Home from '@/components/Home/Home';
import Features from '@/components/Features/Features';
import About from '@/components/About/About';
import Team from '@/components/Team/Team';
import { ErrorButton } from '@/components/ErrorBoundary/ErrorButton/ErrorButton';

const Welcome: FC = () => {
  return (
    <>
      <Home />
      <Features />
      <About />
      <Team />
      <ErrorButton />
    </>
  );
};

export default Welcome;
