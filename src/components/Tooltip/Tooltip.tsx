import * as React from 'react';
import { ReactNode, useState } from 'react';
import TooltipMessage from '../TooltipMessage';

interface TooltipProps {
  message: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, message }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleOver = () => {
    setShow(true);
  };

  const handleOut = () => {
    setShow(false);
  };

  return (
    <>
      <span onMouseOver={handleOver} onMouseOut={handleOut}>
        {children}
      </span>
      {show && <TooltipMessage message={message} />}
    </>
  );
};

export default Tooltip;
