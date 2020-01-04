import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSProperties, ReactNode, useLayoutEffect, useState } from 'react';
import styles from './Notice.style.css';
import { addRootElement } from '../../lib/generateElement';

const containerId = 'notice-container';

interface NoticeProps extends NoticeOptions {
  onClose: () => void;
  message: ReactNode;
}

const Notice: React.FC<NoticeProps> = ({
  message,
  onClose,
  dimmedClassName = '',
  dimmedStyle,
  contentClassName = '',
  contentStyle,
  messageStyle,
  okClassName = '',
  okStyle,
  okText = 'OK',
}) => {
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
      className={`${styles.notice} ${dimmedClassName} ${
        active ? styles.active : ''
      }`}
      style={dimmedStyle}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={`${styles['notice-content']} ${contentClassName}`}
        style={contentStyle}
      >
        <div className={styles['notice-message']} style={messageStyle}>
          {message}
        </div>
        <div className={styles['notice-button-wrap']}>
          <button
            autoFocus
            type="button"
            className={`${styles['notice-button-ok']} ${okClassName}`}
            style={okStyle}
            onClick={handleClose}
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

interface NoticeOptions {
  dimmedClassName?: string;
  dimmedStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  messageClassName?: string;
  messageStyle?: CSSProperties;
  okClassName?: string;
  okStyle?: CSSProperties;
  okText?: string;
}

const notice = (message: string, options: NoticeOptions = {}) =>
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
      <Notice message={message} onClose={handleClose} {...options} />,
      container,
    );
  });

export default notice;
