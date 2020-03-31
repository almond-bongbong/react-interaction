import * as React from 'react';
import { CSSProperties, ReactNode, useRef, useState } from 'react';
import TooltipMessage from '../TooltipMessage';
import styles from './Tooltip.style.css';

interface TooltipProps {
  message: ReactNode;
  messageStyle?: CSSProperties;
  messageClassName?: string;
  toggle?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  message,
  messageStyle,
  messageClassName,
  toggle = false,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const triggerElementRef = useRef<HTMLSpanElement>(null);
  const triggerRect = triggerElementRef.current && triggerElementRef.current.getBoundingClientRect();
  const triggerOffset = triggerRect && {
    top: triggerRect.top + window.pageYOffset,
    left: triggerRect.left + window.pageXOffset,
    width: triggerRect.width,
    height: triggerRect.height,
  };

  const handleOver = () => {
    setShow(true);
  };

  const handleOut = () => {
    setShow(false);
  };

  const handleToggle = () => {
    setShow(prev => !prev);
  };

  const handleBlur = () => {
    setShow(false);
  };

  return (
    <>
      <span
        ref={triggerElementRef}
        className={styles['tooltip-trigger']}
        {...toggle
          ? { onClick: handleToggle, onBlur: handleBlur }
          : { onMouseOver: handleOver, onMouseOut: handleOut }
        }
      >
        {children}
      </span>
      <TooltipMessage
        show={show}
        message={message}
        messageStyle={messageStyle}
        messageClassName={messageClassName}
        triggerOffset={triggerOffset}
        triggerElement={triggerElementRef.current}
      />
    </>
  );
};

export default Tooltip;
