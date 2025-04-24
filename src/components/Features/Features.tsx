import { FC } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import useFeaturesData from './featuresData';

import styles from './Features.module.scss';
import useTranslation from '@/localization/useTranslation';

const Features: FC = () => {
  const t = useTranslation();
  const { featuresData } = useFeaturesData();

  return (
    <section className={styles.section}>
      <div className={cn(styles.features, 'wrapper')}>
        <h2 className={styles.features_title}>{t['Main Features']}</h2>
        <p className={styles.features_subtitle}>
          {
            t[
              'Now, you can dive into the rich capabilities that set our application apart. The following features embody the essence of our commitment to delivering an exceptional user experience.'
            ]
          }
        </p>
        <ul className={styles.features_list}>
          {featuresData.map((feature, index) => (
            <li className={styles.feature_item} key={index}>
              <div className={styles.feature_wrapper}>
                <Image
                  className={styles.feature_image}
                  width={38}
                  height={38}
                  src={feature.imageSrc}
                  alt={feature.alt}
                />
              </div>
              <h3 className={styles.feature_title}>{feature.title}</h3>
              <p className={styles.feature_description}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;
