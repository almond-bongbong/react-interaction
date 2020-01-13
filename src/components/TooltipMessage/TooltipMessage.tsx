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
  triggerElement: HTMLElement | null;
}

const containerId = 'tooltip-container';
const ADJUSTMENT = 15;
const arrowBottomStyle: CSSProperties = {
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderTop: '5px solid rgba(0, 0, 0, 0.8)',
};
const arrowTopStyle: CSSProperties = {
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderBottom: '5px solid rgba(0, 0, 0, 0.8)',
};

const calcTop = (triggerTop: number, messageHeight: number) =>
  triggerTop - messageHeight - ADJUSTMENT;
const calcBottom = (triggerTop: number, triggerHeight: number) =>
  triggerTop + triggerHeight + ADJUSTMENT;
const calcLeft = (
  triggerLeft: number,
  triggerWidth: number,
  messageWidth: number,
) => Math.max(triggerLeft - (messageWidth - triggerWidth) / 2, ADJUSTMENT);

const TooltipMessage: React.FC<TooltipMessageProps> = ({
  show,
  message,
  triggerOffset,
  triggerElement,
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
  }: {
    tooltipStyle: CSSProperties;
    arrowStyle: CSSProperties;
  } = useMemo(() => {
    const messageElement = messageElementRef.current;

    if (
      triggerOffset &&
      messageElement &&
      messageElement.offsetTop &&
      triggerElement
    ) {
      const messageWidth = messageElement.offsetWidth;
      const messageHeight = messageElement.offsetHeight;
      const triggerElementRect = triggerElement.getBoundingClientRect();
      const triggerTop = triggerOffset.top;
      const triggerLeft = triggerOffset.left;
      const triggerWidth = triggerOffset.width;
      const triggerHeight = triggerOffset.height;
      const rightEnd =
        Math.round(triggerLeft - messageWidth / 2 + triggerWidth / 2) +
        messageWidth;
      const isOverRight = rightEnd + ADJUSTMENT > window.innerWidth;
      const isOverTop = triggerElementRect.top - messageHeight - ADJUSTMENT < 0;
      const messageRight = window.innerWidth - ADJUSTMENT;
      const triggerRight = triggerLeft + triggerWidth;
      const tooltipLeft = calcLeft(triggerLeft, triggerWidth, messageWidth);

      return {
        tooltipStyle: {
          top: isOverTop
            ? calcBottom(triggerTop, triggerHeight)
            : calcTop(triggerTop, messageHeight),
          ...(isOverRight ? { right: ADJUSTMENT } : { left: tooltipLeft }),
        },
        arrowStyle: {
          ...(isOverTop
            ? { top: -5, ...arrowTopStyle }
            : { bottom: -5, ...arrowBottomStyle }),
          ...(isOverRight
            ? {
                right: triggerOffset.width / 2 + (messageRight - triggerRight),
                transform: 'translateX(50%)',
              }
            : {
                left:
                  triggerOffset.width / 2 + triggerOffset.left - tooltipLeft,
                transform: 'translateX(-50%)',
              }),
        },
      };
    }

    return {
      tooltipStyle: { top: -9999, left: -9999 },
      arrowStyle: { top: -9999, left: -9999 },
    };
  }, [
    triggerOffset,
    messageElementRef.current,
    window.innerWidth,
    triggerElement,
  ]);

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
