import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { hasWindow } from '../../lib/browser';

interface Props {
  selector: string;
  children: ReactNode;
}

function Portal({ selector, children }: Props) {
  const element = hasWindow() && document.querySelector(selector);
  if (!element) {
    return null;
  }

  return createPortal(children, element);
}

export default Portal;
