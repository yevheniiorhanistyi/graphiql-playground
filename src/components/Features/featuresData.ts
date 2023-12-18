import useTranslation from '@/localization/useTranslation';
import { Feature } from '@/types/features';

const useFeaturesData = () => {
  const t = useTranslation();

  const featuresData: Feature[] = [
    {
      imageSrc: '/graphql.png',
      alt: 'GraphQL',
      title: 'GraphQL',
      description: `${t['Adapted GraphiQL Playground to your specific needs with unmatched flexibility. Customize the features according to your development workflow, providing a customized and efficient environment for your team.']}`,
    },
    {
      imageSrc: '/authorization.png',
      alt: `${t['Authorization']}`,
      title: `${t['Authorization']}`,
      description: `${t['Take advantage of the reliable user authentication and authorization capabilities adapted for our application. Ensure a safe and seamless user experience by controlling access based on precisely configured permissions.']}`,
    },
    {
      imageSrc: '/firebase.png',
      alt: 'Firebase',
      title: 'Firebase',
      description: `${t['Easy integration with Firebase for secure authentication. Firebase features are used to enhance security, optimize user authentication, and simplify user data management, ensuring a seamless user experience.']}`,
    },
    {
      imageSrc: '/flexibility.png',
      alt: `${t['Flexibility']}`,
      title: `${t['Flexibility']}`,
      description: `${t['The unsurpassed flexibility of our application has been achieved. Our responsive design allows the application to dynamically adapt to various devices, including desktops, laptops, tablets, and smartphones.']}`,
    },
  ];

  return { featuresData };
};

export default useFeaturesData;
