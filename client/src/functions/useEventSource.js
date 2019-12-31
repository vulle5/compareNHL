import { useState, useEffect, useCallback } from 'react';

const useEventSource = (src, type) => {
  const [event, setEvent] = useState(null);

  const onEvent = useCallback(e => {
    setEvent(e);
  }, []);

  useEffect(() => {
    const sseSource = new EventSource(src);
    sseSource.addEventListener(type, e => onEvent(e));
    return function closeConnection() {
      sseSource.close();
    };
  }, [onEvent, src, type]);

  return event;
};

export default useEventSource;
