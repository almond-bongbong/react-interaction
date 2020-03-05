import * as React from 'react';
import { CSSProperties, ReactNode, useRef, useState } from 'react';
import TooltipMessage from '../TooltipMessage';
import styles from './Tooltip.style.css';

interface TooltipProps {
  message: ReactNode;
  messageStyle?: CSSProperties;
  messageClassName?: string;
  toggle: boolean;
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
