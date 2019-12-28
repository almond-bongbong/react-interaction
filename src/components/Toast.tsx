import * as React from 'react';
import { ReactNode, useLayoutEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import styles from './Toast.style.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addRootElement } from '../lib/generateElement';

export interface ToastOptions {
  time?: number;
  className?: string;
}

const defaultOptions: ToastOptions = {
  time: 3000,
  className: '',
};

interface ToastProps {
  className: string;
  message: string;
}

let toastComponentList: any[] = [];
const init = () => {
  const toastContainer = document.getElementById(styles['toast_container']);
  if (!toastContainer) {
    addRootElement(styles['toast_container']);
  }
  if (!toastComponentList || !Array.isArray(toastComponentList)) {
    toastComponentList = [];
  }

  renderDOM();
};

const renderDOM = () => {
  const container = document.getElementById(styles['toast_container']);

  ReactDOM.render(
    <div className={`${styles['toast-list']}`}>
      <TransitionGroup classnames="list">
        {toastComponentList.map(t => (
          <CSSTransition key={t.id} timeout={300} classNames="toast">
            {t.component}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>,
    container,
  );
};

const Toast: React.FunctionComponent<ToastProps> = ({ className, message }) => {
  const messageDOM: any = useRef();

  useLayoutEffect(() => {
    if (messageDOM.current && messageDOM.current.clientHeight) {
      const height = messageDOM.current.clientHeight;
      messageDOM.current.style.height = '0px';
      setTimeout(() => {
        messageDOM.current.style.height = `${height}px`;
      }, 0);
    }
  }, [messageDOM.current]);

  return (
    <div ref={messageDOM} className={`${styles['toast-message']}`}>
      <div
        className={`${styles['toast-content']} interaction-toast-message ${className}`}
      >
        {message}
      </div>
    </div>
  );
};

const toast = (
  message: string | ReactNode,
  options: ToastOptions,
) => {
  init();

  const mergedOptions = { ...defaultOptions, ...options };
  const id = Date.now();

  toastComponentList.push({
    id,
    options: mergedOptions,
    component:
      typeof message === 'string' ? (
        <Toast message={message} className={mergedOptions.className || ''} />
      ) : (
        message
      ),
  });

  renderDOM();
  setTimeout(() => {
    const index = toastComponentList.findIndex(t => t.id === id);
    toastComponentList.splice(index, 1);
    renderDOM();
  }, mergedOptions.time);
};

export default toast;
