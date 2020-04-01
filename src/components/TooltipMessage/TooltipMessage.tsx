import * as React from 'react';
import { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import styles from './TooltipMessage.style.css';
import { withNewline } from '../../lib/ReactStringUtil';
import useForceUpdate from '../../hooks/useForceUpdate';
import { hasWindow } from '../../lib/browser';
import { EventHandler } from '../../lib/EventHandler';

interface TooltipMessageProps {
  show: boolean;
  message: ReactNode;
  messageStyle?: CSSProperties;
  messageClassName?: string;
  triggerElement: HTMLElement | null;
}

const containerId = 'tooltip-container';
const ADJUSTMENT = 15;
const getArrowBottomStyleWithColor = (
  arrowColor: string = 'rgba(0, 0, 0, 0.8)',
): CSSProperties => ({
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderTop: `5px solid ${arrowColor}`,
});
const getArrowTopStyleWithColor = (
  arrowColor: string = 'rgba(0, 0, 0, 0.8)',
): CSSProperties => ({
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderBottom: `5px solid ${arrowColor}`,
});

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
  messageStyle,
  messageClassName = '',
  triggerElement,
}) => {
  let container: HTMLElement | null = hasWindow() ? document.getElementById(containerId) : null;
  const messageElementRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  if (!container) {
    addRootElement(containerId);
    container = hasWindow() ? document.getElementById(containerId) : null;
  }

  useEffect(() => {

    if (hasWindow()) EventHandler.addEventListener('resize.tooltip', forceUpdate);

    return () => {
      if (hasWindow()) EventHandler.removeEventListener('resize.tooltip');
    };
  }, []);

  const {
    tooltipStyle,
    tooltipArrowStyle,
  }: {
    tooltipStyle: CSSProperties;
    tooltipArrowStyle: CSSProperties;
  } = useMemo(() => {
    const messageElement = messageElementRef.current;

    if (hasWindow() && messageElement && messageElement.offsetTop && triggerElement) {
      const tooltipBackgroundColor = window
        .getComputedStyle(messageElement, null)
        .getPropertyValue('background-color');
      const messageWidth = messageElement.offsetWidth;
      const messageHeight = messageElement.offsetHeight;
      const triggerElementRect = triggerElement.getBoundingClientRect();
      const triggerOffset = triggerElementRect && {
        top: triggerElementRect.top + window.pageYOffset,
        left: triggerElementRect.left + window.pageXOffset,
        width: triggerElementRect.width,
        height: triggerElementRect.height,
      };
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
      let tooltipCalculatedStyle: CSSProperties = {};
      let tooltipArrowCalculatedStyle: CSSProperties = {};

      if (isOverTop) {
        tooltipCalculatedStyle.top = calcBottom(triggerTop, triggerHeight);
        tooltipArrowCalculatedStyle = {
          top: -5,
          ...getArrowTopStyleWithColor(tooltipBackgroundColor),
        };
      } else {
        tooltipCalculatedStyle.top = calcTop(triggerTop, messageHeight);
        tooltipArrowCalculatedStyle = {
          bottom: -5,
          ...getArrowBottomStyleWithColor(tooltipBackgroundColor),
        };
      }

      if (isOverRight) {
        tooltipCalculatedStyle.right = ADJUSTMENT;
        tooltipArrowCalculatedStyle.right =
          triggerOffset.width / 2 + (messageRight - triggerRight);
        tooltipArrowCalculatedStyle.transform = 'translateX(50%)';
      } else {
        tooltipCalculatedStyle.left = tooltipLeft;
        tooltipArrowCalculatedStyle.left =
          triggerOffset.width / 2 + triggerOffset.left - tooltipLeft;
        tooltipArrowCalculatedStyle.transform = 'translateX(-50%)';
      }

      return {
        tooltipStyle: tooltipCalculatedStyle,
        tooltipArrowStyle: tooltipArrowCalculatedStyle,
      };
    }

    return {
      tooltipStyle: { top: -9999, left: -9999 },
      tooltipArrowStyle: { top: -9999, left: -9999 },
    };
  }, [messageElementRef.current, triggerElement]);

  return (
    container &&
    createPortal(
      <div
        ref={messageElementRef}
        className={`${styles['tooltip']} ${messageClassName} ${
          show ? styles['active'] : ''
        }`}
        style={{ ...tooltipStyle, ...messageStyle }}
      >
        {typeof message === 'string' ? withNewline(message) : message}
        <span
          className={styles['arrow']}
          style={{
            ...tooltipArrowStyle,
          }}
        />
      </div>,
      container,
    )
  );
};

export default TooltipMessage;
