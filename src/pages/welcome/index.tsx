import { FC } from 'react';
import Link from 'next/link';
import { Routes } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import cn from 'classnames';
import BasicButton from '@/components/common/BasicButton/BasicButton';

import styles from '../../styles/pages/Welcome.module.scss';

const Welcome: FC = () => {
  const { authUser } = useAuthContext();

  const linkText = authUser ? 'Go to Playground page' : 'Go to Auth page';

  return (
    <div className={cn('wrapper')}>
      <section className={cn(styles.section, styles.welcome)}>
        <h1 className={cn(styles.title, styles.welcome_title)}>Welcome to GraphiQL Playground!</h1>
        <p className={cn(styles.subtitle, styles.welcome_subtitle)}>
          Discover the features of our platform, a robust tool crafted for executing and refining
          your GraphQL queries. Easily interact with your GraphQL API, create queries, and analyze
          the responses - all in one place. Maximize this space for developing and fine-tuning your
          queries.
        </p>
        <BasicButton customStyles={{ width: '20rem', height: '5rem', borderRadius: '0.5rem' }}>
          <Link
            className={styles.welcome_link}
            href={authUser ? Routes.PLAYGROUND_PAGE : Routes.AUTH_PAGE}
          >
            {linkText}
          </Link>
        </BasicButton>
      </section>
    </div>
  );
};

export default Welcome;
