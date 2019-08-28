import React from "react";

import ScheduleDayList from "./ScheduleDayList";

const Home = () => {
  return (
    <div style={{ minHeight: " calc(100vh - 64px)", margin: "32px 16px" }}>
      <ScheduleDayList />
    </div>
  );
};

export default Home;
