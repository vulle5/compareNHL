import { useState, useEffect, useCallback, useRef } from 'react';

const useEventSource = (
  src,
  type,
  { onMessage = null, onError = null, onOpen = null } = {}
) => {
  const [event, setEvent] = useState(null);
  const [eventSource, setEventSource] = useState(null);
  const eventSourceRef = useRef(null);

  const onEvent = useCallback(e => {
    setEvent(e);
  }, []);

  // When src changes create a new instance of EventSource
  useEffect(() => {
    eventSourceRef.current = new EventSource(src);
    setEventSource(eventSourceRef.current)
  }, [src]);

  // Assign handlers
  useEffect(() => {
    eventSourceRef.current.onmessage = onMessage;
    eventSourceRef.current.onerror = onError;
    eventSourceRef.current.onopen = onOpen;
  }, [onError, onMessage, onOpen, src]);

  // Handle events and closing
  useEffect(() => {
    const eventRef = eventSourceRef.current;
    eventRef.addEventListener(type ?? 'message', e => onEvent(e));
    return function closeConnection() {
      eventRef.close();
    };
  }, [onEvent, type, src]);

  return [event, eventSource];
};

export default useEventSource;
