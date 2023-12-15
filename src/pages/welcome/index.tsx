import { FC } from 'react';
import Home from '@/components/Home/Home';
import Features from '@/components/Features/Features';
import About from '@/components/About/About';

const Welcome: FC = () => {
  return (
    <>
      <Home />
      <Features />
      <About />
    </>
  );
};

export default Welcome;
