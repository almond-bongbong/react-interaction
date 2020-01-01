import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './Alert.style.css';
import { addRootElement } from '../../lib/generateElement';

const alertContainer = document.getElementById('alert_container');
if (!alertContainer) addRootElement('alert_container');

const alert = (message: string) =>
  new Promise(resolve => {
    const container = document.getElementById('alert_container');

    const handleClose = () => {
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
        resolve();
      }
    };

    ReactDOM.render(
      <div className={styles.alert}>
        <div className={styles.alert_content}>
          <div className={styles.alert_message}>{message}</div>
          <button type="button" onClick={handleClose}>
            확인
          </button>
        </div>
      </div>,
      container,
    );
  });

export default alert;
