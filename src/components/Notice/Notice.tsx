import * as React from 'react';
import { CSSProperties } from 'react';
import * as ReactDOM from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import Dialog from '../Dialog';

const containerId = 'notice-container';

export interface NoticeOptions {
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
      <Dialog
        message={message}
        onClose={handleClose}
        okText="OK"
        {...options}
      />,
      container,
    );
  });

export default notice;
