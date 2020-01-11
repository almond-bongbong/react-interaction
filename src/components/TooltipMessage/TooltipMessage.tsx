import * as React from 'react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { addRootElement } from '../../lib/generateElement';
import styles from './TooltipMessage.style.css';
import { withNewline } from '../../lib/ReactStringUtil';

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
  TOP_LEFT: 'top left',
  TOP_CENTER: 'top center',
  TOP_RIGHT: 'top right',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_CENTER: 'bottom center',
  BOTTOM_RIGHT: 'bottom right',
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
) => round(triggerLeft - messageWidth + triggerWidth / 2) + ADJUSTMENT;
const calcRight = (triggerLeft: number, triggerWidth: number) =>
  round(triggerLeft + triggerWidth / 2) - ADJUSTMENT;

const TooltipMessage: React.FC<TooltipMessageProps> = ({
  show,
  message,
  triggerOffset,
}) => {
  let container: HTMLElement | null = document.getElementById(containerId);
  const messageElementRef = useRef<HTMLDivElement>(null);
  const [direction] = useState(tooltipDirection.TOP_CENTER);
  const [top, setTop] = useState<number>(-9999);
  const [left, setLeft] = useState<number>(-9999);

  if (!container) {
    addRootElement(containerId);
    container = document.getElementById(containerId);
  }

  useEffect(() => {
    const messageElement = messageElementRef.current;

    if (triggerOffset && messageElement) {
      switch (direction) {
        case tooltipDirection.BOTTOM_CENTER:
          setTop(calcBottom(triggerOffset.top, triggerOffset.height));
          setLeft(
            calcCenter(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          );
          break;
        case tooltipDirection.BOTTOM_LEFT:
          setTop(calcBottom(triggerOffset.top, triggerOffset.height));
          setLeft(
            calcLeft(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          );
          break;
        case tooltipDirection.BOTTOM_RIGHT:
          setTop(calcBottom(triggerOffset.top, triggerOffset.height));
          setLeft(calcRight(triggerOffset.left, triggerOffset.width));
          break;
        case tooltipDirection.TOP_CENTER:
          setTop(calcTop(triggerOffset.top, messageElement.offsetHeight));
          setLeft(
            calcCenter(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          );
          break;
        case tooltipDirection.TOP_LEFT:
          setTop(calcTop(triggerOffset.top, messageElement.offsetHeight));
          setLeft(
            calcLeft(
              triggerOffset.left,
              triggerOffset.width,
              messageElement.offsetWidth,
            ),
          );
          break;
        case tooltipDirection.TOP_RIGHT:
          setTop(calcTop(triggerOffset.top, messageElement.offsetHeight));
          setLeft(calcRight(triggerOffset.left, triggerOffset.width));
          break;
        default:
          break;
      }
    }

    return () => {
      setTop(-9999);
      setLeft(-9999);
    };
  }, [triggerOffset, direction]);

  return (
    container &&
    createPortal(
      <div
        ref={messageElementRef}
        className={`${styles['tooltip']} ${show ? styles['active'] : ''}`}
        style={{ top, left }}
      >
        {typeof message === 'string' ? withNewline(message) : message}
      </div>,
      container,
    )
  );
};

export default TooltipMessage;
