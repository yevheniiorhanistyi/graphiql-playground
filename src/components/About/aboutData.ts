import useTranslation from '@/localization/useTranslation';
import { About } from '@/types/about';

const useAboutData = () => {
  const t = useTranslation();

  const aboutData: About[] = [
    {
      id: 1,
      imageSrc: '/check.png',
      alt: `${t['Check']}`,
      description: `${t['Working with React']}`,
    },
    {
      id: 2,
      imageSrc: '/check.png',
      alt: `${t['Check']}`,
      description: `${t['To use React Hooks in practice']}`,
    },
    {
      id: 3,
      imageSrc: '/check.png',
      alt: `${t['Check']}`,
      description: `${t['Acquainted with the React Hook Form and Yup']}`,
    },
    {
      id: 4,
      imageSrc: '/check.png',
      alt: `${t['Check']}`,
      description: `${t['How to connect Firebase and GraphQl']}`,
    },
  ];

  return { aboutData };
};

export default useAboutData;
