import { FC, MouseEvent, useState } from 'react';

import styles from './Nav.module.scss';
import AuthenticateIcon from '../UI/AuthenticateIcon/AuthenticateIcon';
import Modal from '@/components/UI/Modal/Modal';
import Router from './Router';

const Nav: FC = () => {
  const [modal, setModal] = useState(false);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setModal(!modal);
  };

  return (
    <>
      <div className={styles.authenticate} onClick={handleClick}>
        <AuthenticateIcon />
        <Modal visible={modal} setVisible={setModal} top="4.5rem" right="3rem">
          <nav className={styles.authenticateNav} onClick={handleClick}>
            <Router />
          </nav>
        </Modal>
      </div>

      <nav className={styles.nav}>
        <Router />
      </nav>
    </>
  );
};

export default Nav;
