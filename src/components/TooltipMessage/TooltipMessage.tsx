import * as React from 'react';
import { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import styles from './TooltipMessage.style.css';
import { withNewline } from '../../lib/ReactStringUtil';
import useForceUpdate from '../../hooks/useForceUpdate';

interface TriggerOffset {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TooltipMessageProps {
  show: boolean;
  message: ReactNode;
  triggerOffset: TriggerOffset | null;
}

const containerId = 'tooltip-container';
const ADJUSTMENT = 15;

const calcTop = (triggerTop: number, messageHeight: number) =>
  triggerTop - messageHeight - ADJUSTMENT;
const calcLeft = (
  triggerLeft: number,
  triggerWidth: number,
  messageWidth: number,
) => Math.max(triggerLeft - (messageWidth - triggerWidth) / 2, ADJUSTMENT);

const TooltipMessage: React.FC<TooltipMessageProps> = ({
  show,
  message,
  triggerOffset,
}) => {
  let container: HTMLElement | null = document.getElementById(containerId);
  const messageElementRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  if (!container) {
    addRootElement(containerId);
    container = document.getElementById(containerId);
  }

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);

    return () => {
      window.removeEventListener('resize', forceUpdate);
    };
  }, []);

  const {
    tooltipStyle,
    arrowStyle,
  }: { tooltipStyle: CSSProperties; arrowStyle: CSSProperties } = useMemo(() => {
    const messageElement = messageElementRef.current;

    if (triggerOffset && messageElement && messageElement.offsetTop) {
      const messageWidth = messageElement.offsetWidth;
      const messageHeight = messageElement.offsetHeight;
      const triggerTop = triggerOffset.top;
      const triggerLeft = triggerOffset.left;
      const triggerWidth = triggerOffset.width;
      const rightEnd =
        Math.round(triggerLeft - messageWidth / 2 + triggerWidth / 2) +
        messageWidth;
      const isOverRight = rightEnd + ADJUSTMENT > window.innerWidth;
      // const isOverTop = triggerTop - messageHeight - ADJUSTMENT < 0;

      const messageRight = window.innerWidth - ADJUSTMENT;
      const triggerRight = triggerLeft + triggerWidth;

      if (isOverRight) {
        return {
          tooltipStyle: {
            top: calcTop(triggerTop, messageHeight),
            right: ADJUSTMENT,
          },
          arrowStyle: {
            bottom: -5,
            right: triggerOffset.width / 2 + (messageRight - triggerRight),
            transform: 'translateX(50%)'
          },
        };
      }

      const tooltipLeft = calcLeft(triggerLeft, triggerWidth, messageWidth);

      return {
        tooltipStyle: {
          top: calcTop(triggerTop, messageHeight),
          left: tooltipLeft,
        },
        arrowStyle: {
          bottom: -5,
          left: triggerOffset.width / 2 + triggerOffset.left - tooltipLeft,
          transform: 'translateX(-50%)'
        },
      };
    }

    return {
      tooltipStyle: { top: -9999, left: -9999 },
      arrowStyle: { top: -9999, left: -9999 },
    };
  }, [triggerOffset, messageElementRef.current, window.innerWidth]);

  return (
    container &&
    createPortal(
      <div
        ref={messageElementRef}
        className={`${styles['tooltip']} ${show ? styles['active'] : ''}`}
        style={tooltipStyle}
      >
        {typeof message === 'string' ? withNewline(message) : message}
        <span className={styles['arrow']} style={arrowStyle} />
      </div>,
      container,
    )
  );
};

export default TooltipMessage;
