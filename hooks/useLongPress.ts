import { useCallback, useRef, useState } from "react";

type EventType = React.MouseEvent | React.TouchEvent;

interface UseLongPressOptions {
  shouldPreventDefault?: boolean;
  delay?: number;
}

const useLongPress = (
  onLongPress: (event: EventType) => void,
  onClick: (event: EventType) => void,
  { shouldPreventDefault = true, delay = 300 }: UseLongPressOptions = {},
  payload?: any
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<number | null>(null);
  const target = useRef<EventTarget | null>(null);

  const start = useCallback((event: EventType) => {
    if (shouldPreventDefault && event.target) {
      event.target.addEventListener("touchend", preventDefaultWrapper, { passive: false });
      target.current = event.target;
    }
    timeout.current = window.setTimeout(() => {
      onLongPress(event);
      setLongPressTriggered(true);
    }, delay);
  }, [onLongPress, delay, shouldPreventDefault]);

  const clear = useCallback((event: EventType, shouldTriggerClick = true) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (shouldTriggerClick && !longPressTriggered) {
      onClick(event);
    }
    setLongPressTriggered(false);
    if (shouldPreventDefault && target.current) {
      target.current.removeEventListener("touchend", preventDefaultWrapper);
    }
  }, [shouldPreventDefault, onClick, longPressTriggered]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: (e: EventType) => clear(e, false),
    onTouchEnd: clear,
    payload
  };
};

const isTouchEvent = (event: EventType): event is React.TouchEvent => {
  return "touches" in event;
};

const preventDefault = (event: EventType) => {
  if (isTouchEvent(event) && event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const preventDefaultWrapper = (event: Event) => {
  preventDefault(event as any as EventType);
};

export default useLongPress;
