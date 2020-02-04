import * as React from 'react';
import { CSSProperties, ReactNode, useRef, useState } from 'react';
import TooltipMessage from '../TooltipMessage';
import styles from './Tooltip.style.css';

interface TooltipProps {
  message: ReactNode;
  messageStyle?: CSSProperties;
  messageClassName?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  message,
  messageStyle,
  messageClassName,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const triggerElementRef = useRef<HTMLSpanElement>(null);
  const triggerOffset = triggerElementRef.current && {
    top: triggerElementRef.current.offsetTop,
    left: triggerElementRef.current.offsetLeft,
    width: triggerElementRef.current.offsetWidth,
    height: triggerElementRef.current.offsetHeight,
  };

  const handleOver = () => {
    setShow(true);
  };

  const handleOut = () => {
    setShow(true);
  };

  return (
    <>
      <span
        ref={triggerElementRef}
        onMouseOver={handleOver}
        onMouseOut={handleOut}
        className={styles['tooltip-trigger']}
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
