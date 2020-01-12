import * as React from 'react';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
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
const tooltipDirection = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

const { round } = Math;
const calcTop = (triggerTop: number, messageHeight: number) =>
  triggerTop - messageHeight - ADJUSTMENT;
const calcBottom = (triggerTop: number, triggerHeight: number) =>
  triggerTop + triggerHeight + ADJUSTMENT;
const calcCenter = (
  triggerLeft: number,
  triggerWidth: number,
  messageWidth: number,
) => round(triggerLeft - messageWidth / 2 + triggerWidth / 2);
const calcLeft = (
  triggerLeft: number,
  triggerWidth: number,
  messageWidth: number,
) => round(triggerLeft - (messageWidth - triggerWidth));
const calcRight = (triggerLeft: number) => triggerLeft;

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

  const direction = useMemo(() => {
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
      const leftEnd = Math.round(
        triggerLeft - messageWidth / 2 + triggerWidth / 2,
      );
      const isOverRight = rightEnd + ADJUSTMENT > window.innerWidth;
      const isOverLeft = leftEnd < 0;
      const isOverTop = triggerTop - messageHeight - ADJUSTMENT < 0;

      if (!isOverTop && isOverRight) return tooltipDirection.TOP_LEFT;
      if (!isOverTop && isOverLeft) return tooltipDirection.TOP_RIGHT;
      if (isOverTop) return tooltipDirection.BOTTOM_CENTER;
      if (isOverRight && isOverTop) return tooltipDirection.BOTTOM_LEFT;
      if (isOverLeft && isOverTop) return tooltipDirection.BOTTOM_RIGHT;
    }

    return tooltipDirection.TOP_CENTER;
  }, [triggerOffset, window.innerWidth]);

  const [top, left] = useMemo(() => {
    const messageElement = messageElementRef.current;

    if (triggerOffset && messageElement) {
      switch (direction) {
        case tooltipDirection.BOTTOM_CENTER:
          return [
            calcBottom(triggerOffset.top, triggerOffset.height),
            calcCenter(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          ];
        case tooltipDirection.BOTTOM_LEFT:
          return [
            calcBottom(triggerOffset.top, triggerOffset.height),
            calcLeft(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          ];
        case tooltipDirection.BOTTOM_RIGHT:
          return [
            calcBottom(triggerOffset.top, triggerOffset.height),
            calcRight(triggerOffset.left),
          ];
        case tooltipDirection.TOP_CENTER:
          return [
            calcTop(triggerOffset.top, messageElement.offsetHeight),
            calcCenter(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          ];
        case tooltipDirection.TOP_LEFT:
          return [
            calcTop(triggerOffset.top, messageElement.offsetHeight),
            calcLeft(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          ];
        case tooltipDirection.TOP_RIGHT:
          return [
            calcTop(triggerOffset.top, messageElement.offsetHeight),
            calcRight(triggerOffset.left),
          ];
        default:
          return [-9999, -9999];
      }
    }

    return [-9999, -9999];
  }, [triggerOffset, direction, messageElementRef.current]);

  return (
    container &&
    createPortal(
      <div
        ref={messageElementRef}
        className={`${styles['tooltip']} ${show ? styles['active'] : ''}`}
        style={{ top, left }}
      >
        {typeof message === 'string' ? withNewline(message) : message}
        <span className={styles['arrow']} />
      </div>,
      container,
    )
  );
};

export default TooltipMessage;
