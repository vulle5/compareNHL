import { useState, useEffect, useCallback, useRef } from 'react';

const useEventSource = (
  src,
  type,
  { onMessage = null, onError = null, onOpen = null } = {}
) => {
  const [event, setEvent] = useState(null);
  const eventSource = useRef(new EventSource(src));
  eventSource.current.onmessage = onMessage;
  eventSource.current.onerror = onError;
  eventSource.current.onopen = onOpen;

  const onEvent = useCallback(e => {
    setEvent(e);
  }, []);

  useEffect(() => {
    const eventRef = eventSource.current;
    eventRef.addEventListener(type ?? 'message', e => onEvent(e));
    return function closeConnection() {
      eventRef.close();
    };
  }, [onEvent, type]);

  return event;
};

export default useEventSource;
