import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import Dialog from '../Dialog';
import { CSSProperties } from 'react';

const containerId = 'inquiry-container';

export interface InquiryOptions {
  dimmedClassName?: string;
  dimmedStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  messageClassName?: string;
  messageStyle?: CSSProperties;
  okClassName?: string;
  okStyle?: CSSProperties;
  okText?: string;
  cancelClassName?: string;
  cancelStyle?: CSSProperties;
  cancelText?: string;
}

const inquiry = (message: string | React.ReactNode, options: InquiryOptions) =>
  new Promise(resolve => {
    let container: HTMLElement | null = document.getElementById(containerId);

    if (!container) {
      addRootElement(containerId);
      container = document.getElementById(containerId);
    }

    const handleClose = (flag: boolean) => {
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
      resolve(flag);
    };

    ReactDOM.render(
      <Dialog
        message={message}
        onClose={handleClose}
        okText="OK"
        cancelText="Cancel"
        {...options}
      />,
      container,
    );
  });

export default inquiry;
