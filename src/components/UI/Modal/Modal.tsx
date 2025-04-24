import { FC, HTMLAttributes, ReactNode } from 'react';
import classes from './Modal.module.scss';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  visible?: boolean;
  // eslint-disable-next-line no-unused-vars
  setVisible: (visible: boolean) => void;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const Modal: FC<ModalProps> = ({ children, visible, setVisible, top, right, bottom, left }) => {
  const rootClasses = [classes.modal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)} data-testid="modal">
      <div
        style={{ top, right, bottom, left }}
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
