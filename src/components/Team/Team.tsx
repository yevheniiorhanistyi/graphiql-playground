import { FC } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { teamData } from './teamData';
import styles from './Team.module.scss';

const Team: FC = () => (
  <section className={styles.section}>
    <div className={cn(styles.team, 'wrapper')}>
      <h2 className={styles.team_title}>Meet Our Team</h2>
      <ul className={styles.team_list}>
        {teamData.map((member) => (
          <li className={styles.member_item} key={member.id}>
            <Image
              className={styles.member_photo}
              width={200}
              height={200}
              src={member.photo}
              alt={member.name}
            />
            <h3 className={styles.member_name}>{member.name}</h3>
            <p className={styles.member_role}>{member.role}</p>
            <p className={styles.member_bio}>{member.bio}</p>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.bg}></div>
  </section>
);

export default Team;
