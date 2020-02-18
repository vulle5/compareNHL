import React from 'react';
import useEventSource from '../../functions/useEventSource';

const TestSSE = () => {
  // TODO: Maybe use 'useSWR' avoiding useless event listening while not focused
  // and re-renders
  const e = useEventSource('/api/live', 'liveSchedule', {
    onOpen: () => console.log('on hauki')
  });
  if (e) console.log(JSON.parse(e.data));

  if (!e) {
    return '...Loading';
  }

  return <div>success</div>;
};

export default TestSSE;
