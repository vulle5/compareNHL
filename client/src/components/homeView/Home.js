import React from "react";

import ScheduleDayList from "./ScheduleDayList";

const Home = () => {
  return (
    <div style={{ minHeight: " calc(100vh - 64px)", margin: "32px 16px" }}>
      <ScheduleDayList title="Today" />
      <ScheduleDayList title="Tomorrow" />
    </div>
  );
};

export default Home;

// https://statsapi.web.nhl.com/api/v1/seasons/20192020

// https://statsapi.web.nhl.com/api/v1/schedule
// ?startDate=2018-01-09 ?endDate=2018-01-12
// ?expand=schedule.linescore Linescore for completed games
