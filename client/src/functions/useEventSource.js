import { useState, useEffect, useCallback } from 'react';

const useEventSource = src => {
  const [event, setEvent] = useState(null);

  const onEvent = useCallback(e => {
    setEvent(e);
  }, []);

  useEffect(() => {
    const sseSource = new EventSource(src);
    sseSource.addEventListener('date', e => onEvent(e));
    return function closeConnection() {
      sseSource.close();
    };
  }, [onEvent, src]);

  return event;
};

export default useEventSource;
