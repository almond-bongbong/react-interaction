import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import styles from './Confirm.style.css';

const confirmContainer = document.getElementById('confirm_container');
if (!confirmContainer) addRootElement('confirm_container');

const confirm = (message: string | React.ReactNode) =>
  new Promise(resolve => {
    const container: HTMLElement | null = document.getElementById(
      'confirm_container',
    );
    const handleConfirm = (flag: boolean) => {
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
      resolve(flag);
    };

    ReactDOM.render(
      <div className={`${styles['confirm']} interaction-confirm`}>
        <div className={`${styles['confirm-content']} interaction-confirm-content`}>
          <div
            className={`${styles['confirm-message']} interaction-confirm-message`}
          >
            {message}
          </div>
          <div>
            <button onClick={() => handleConfirm(false)}>취소</button>
            <button onClick={() => handleConfirm(true)}>확인</button>
          </div>
        </div>
      </div>,
      container,
    );
  });

export default confirm;
