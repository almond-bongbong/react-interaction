import * as React from 'react';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import styles from './TooltipMessage.style.css';

interface TooltipMessageProps {
  message: ReactNode;
}

const containerId = 'tooltip-container';

const TooltipMessage: React.FC<TooltipMessageProps> = ({ message }) => {
  let container: HTMLElement | null = document.getElementById(containerId);

  if (!container) {
    addRootElement(containerId);
    container = document.getElementById(containerId);
  }

  return (
    container &&
    createPortal(<div className={styles['tooltip']}>{message}</div>, container)
  );
};

export default TooltipMessage;
