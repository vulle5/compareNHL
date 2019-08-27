import React from "react";
import { Typography, Card, CardContent, Avatar } from "@material-ui/core";

const Home = () => {
  return (
    <div style={{ minHeight: " calc(100vh - 64px)", margin: "32px 16px" }}>
      <Typography variant="h4">Today</Typography>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card style={{ width: "288px", margin: "16px 16px 0px 0px" }}>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100px",
              alignItems: "center",
              padding: "16px"
            }}
          >
            <div>
              <Avatar
                style={{ width: "60px" }}
                src="https://www-league.nhlstatic.com/images/logos/teams-current-circle/12.svg"
              />
              <Typography style={{ textAlign: "center" }} variant="subtitle1">
                CAR
              </Typography>
            </div>
            <Typography variant="h5">0 - 0</Typography>
            <div>
              <Avatar
                style={{ width: "60px" }}
                src="https://www-league.nhlstatic.com/images/logos/teams-current-circle/13.svg"
              />
              <Typography style={{ textAlign: "center" }} variant="subtitle1">
                FLA
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card style={{ width: "288px", marginTop: "16px" }}>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100px",
              alignItems: "center",
              padding: "16px"
            }}
          >
            <div>
              <Avatar
                style={{ width: "60px" }}
                src="https://www-league.nhlstatic.com/images/logos/teams-current-circle/16.svg"
              />
              <Typography style={{ textAlign: "center" }} variant="subtitle1">
                CHI
              </Typography>
            </div>
            <Typography variant="h5">20:00</Typography>
            <div>
              <Avatar
                style={{ width: "60px" }}
                src="https://www-league.nhlstatic.com/images/logos/teams-current-circle/15.svg"
              />
              <Typography style={{ textAlign: "center" }} variant="subtitle1">
                CAP
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
