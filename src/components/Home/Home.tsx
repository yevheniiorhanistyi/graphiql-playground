import { FC } from 'react';
import Link from 'next/link';
import { Routes } from '@/constants/enums';
import { useAuthContext } from '@/context/AuthContext';
import cn from 'classnames';
import BasicButton from '@/components/common/BasicButton/BasicButton';

import styles from './Home.module.scss';
import useTranslation from '@/localization/useTranslation';

const Home: FC = () => {
  const t = useTranslation();
  const { authUser } = useAuthContext();

  const linkText = authUser ? `${t['Go to Playground page']}` : `${t['Go to Auth page']}`;

  return (
    <section className={styles.section}>
      <div className={cn(styles.home, 'wrapper')}>
        <h1 className={styles.home_title}>{t['Welcome to GraphiQL Playground!']}</h1>
        <p className={styles.home_subtitle}>
          {
            t[
              'Discover the features of our platform, a robust tool crafted for executing and refining your GraphQL queries. Easily interact with your GraphQL API, create queries, and analyzethe responses - all in one place. Maximize this space for developing and fine-tuning your queries.'
            ]
          }
        </p>
        <BasicButton customStyles={{ width: '21rem', height: '5rem', borderRadius: '0.5rem' }}>
          <Link
            className={styles.home_link}
            href={authUser ? Routes.PLAYGROUND_PAGE : Routes.AUTH_PAGE}
          >
            {linkText}
          </Link>
        </BasicButton>
      </div>
      <div className={cn(styles.svg, styles.svg_1)}>
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="277" cy="63" r="225" fill="url(#paint0_linear_25:217)" />
          <circle cx="17.9997" cy="182" r="18" fill="url(#paint1_radial_25:217)" />
          <circle cx="76.9997" cy="288" r="34" fill="url(#paint2_radial_25:217)" />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            fill="url(#paint3_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="184.521"
            cy="315.521"
            r="132.862"
            transform="rotate(114.874 184.521 315.521)"
            stroke="url(#paint4_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="356"
            cy="290"
            r="179.5"
            transform="rotate(-30 356 290)"
            stroke="url(#paint5_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="191.659"
            cy="302.659"
            r="133.362"
            transform="rotate(133.319 191.659 302.659)"
            fill="url(#paint6_linear_25:217)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_25:217"
              x1="-54.5003"
              y1="-178"
              x2="222"
              y2="288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--bg-svg-elements)" />
              <stop offset="1" stopColor="var(--bg-svg-elements)" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
            >
              <stop offset="0.145833" stopColor="var(--bg-svg-elements)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--bg-svg-elements)" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
            >
              <stop offset="0.145833" stopColor="var(--bg-svg-elements)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--bg-svg-elements)" stopOpacity="0.08" />
            </radialGradient>
            <linearGradient
              id="paint3_linear_25:217"
              x1="226.775"
              y1="-66.1548"
              x2="292.157"
              y2="351.421"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--bg-svg-elements)" />
              <stop offset="1" stopColor="var(--bg-svg-elements)" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:217"
              x1="184.521"
              y1="182.159"
              x2="184.521"
              y2="448.882"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--bg-svg-elements)" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_25:217"
              x1="356"
              y1="110"
              x2="356"
              y2="470"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--bg-svg-elements)" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_25:217"
              x1="118.524"
              y1="29.2497"
              x2="166.965"
              y2="338.63"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--bg-svg-elements)" />
              <stop offset="1" stopColor="var(--bg-svg-elements)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className={cn(styles.svg, styles.svg_2)}>
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.8"
            cx="214.505"
            cy="60.5054"
            r="49.7205"
            transform="rotate(-13.421 214.505 60.5054)"
            stroke="url(#paint4_linear_25:218)"
          />
          <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
          <defs>
            <linearGradient
              id="paint4_linear_25:218"
              x1="214.505"
              y1="10.2849"
              x2="212.684"
              y2="99.5816"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--bg-svg-elements)" />
              <stop offset="1" stopColor="var(--bg-svg-elements)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Home;
