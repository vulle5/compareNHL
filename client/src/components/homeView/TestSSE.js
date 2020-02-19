import React from 'react';
import useEventSource from '../../functions/useEventSource';

const TestSSE = () => {
  // TODO: Maybe use 'useSWR' avoiding useless event listening while not focused
  // and re-renders
  const e = useEventSource(
    '/api/live?startDate=2020-02-19&endDate=2020-02-21&timezone=Europe/Helsinki&expand=schedule.linescore',
    'liveSchedule',
    {
      onOpen: () => console.log('on hauki')
    }
  );
  if (e) console.log(JSON.parse(e.data));

  if (!e) {
    return '...Loading';
  }

  return <div>success</div>;
};

export default TestSSE;
