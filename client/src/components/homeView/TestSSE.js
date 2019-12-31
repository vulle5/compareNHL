import React from 'react';
import useEventSource from '../../functions/useEventSource';

const TestSSE = () => {
  const e = useEventSource('/api/live', 'liveSchedule');
  if (e) console.log(JSON.parse(e.data));

  if (!e) {
    return '...Loading';
  }

  return <div>success</div>;
};

export default TestSSE;
