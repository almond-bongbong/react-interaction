import * as React from 'react';
import { CSSProperties, ReactNode, useRef, useState } from 'react';
import TooltipMessage from '../TooltipMessage';
import styles from './Tooltip.style.css';

interface TooltipProps {
  message: ReactNode;
  style?: CSSProperties;
  messageStyle?: CSSProperties;
  className?: string;
  messageClassName?: string;
  toggle?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  style,
  className,
  message,
  messageStyle,
  messageClassName,
  toggle = false,
}) => {
  const [triggerOn, setTriggerOn] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const triggerElementRef = useRef<HTMLSpanElement>(null);

  const handleOver = () => {
    setShow(true);
    setTriggerOn(true);
  };

  const handleOut = () => {
    setTriggerOn(false);
  };

  const handleToggle = () => {
    if (!triggerOn) {
      setShow(true);
    }
    setTriggerOn(prev => !prev);
  };

  const handleBlur = () => {
    setTriggerOn(false);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <>
      <span
        ref={triggerElementRef}
        className={`${styles['tooltip-trigger']} ${className || ''}`}
        style={style}
        {...(toggle
          ? { onClick: handleToggle, onBlur: handleBlur }
          : { onMouseOver: handleOver, onMouseOut: handleOut })}
      >
        {children}
      </span>
      {show && (
        <TooltipMessage
          triggerOn={triggerOn}
          message={message}
          messageStyle={messageStyle}
          messageClassName={messageClassName}
          triggerElement={triggerElementRef.current!.children[0]}
          onExited={handleHide}
        />
      )}
    </>
  );
};

export default Tooltip;
