import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactNode, useLayoutEffect, useState } from 'react';
import styles from './Notice.style.css';
import { addRootElement } from '../../lib/generateElement';

const containerId = 'notice-container';

interface NoticeProps {
  onClose: () => void;
  message: ReactNode;
}

const Notice: React.FC<NoticeProps> = ({ message, onClose }) => {
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 0);
  }, []);

  const handleClose = () => {
    setActive(false);
  };

  const handleTransitionEnd = () => {
    if (!active) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.notice} ${active ? styles.active : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles['notice-content']}>
        <div className={styles['notice-message']}>{message}</div>
        <div className={styles['notice-button-wrap']}>
          <button
            type="button"
            className={styles['notice-button-ok']}
            onClick={handleClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const notice = (message: string) =>
  new Promise(resolve => {
    let container: HTMLElement | null = document.getElementById(containerId);

    if (!container) {
      addRootElement(containerId);
      container = document.getElementById(containerId);
    }

    const handleClose = () => {
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
        resolve();
      }
    };

    ReactDOM.render(
      <Notice message={message} onClose={handleClose} />,
      container,
    );
  });

export default notice;
