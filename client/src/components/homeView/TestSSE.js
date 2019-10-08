import React from 'react';
import useEventSource from '../../functions/useEventSource';

// Testing SSE not very good for time keeping though
const TestSSE = () => {
  const e = useEventSource('/api/live');

  if (!e) {
    return '...Loading';
  }

  return <div>{e.data}</div>;
};

export default TestSSE;
