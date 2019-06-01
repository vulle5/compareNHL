// const express = require("express");
// const cors = require("cors");

// const app = express();

// let people = [
//   {
//     name: "Arto Hellas",
//     num: "040-123456",
//     id: 1
//   },
//   {
//     name: "Martti Tienari",
//     num: "040-123456",
//     id: 2
//   },
//   {
//     name: "Arto Järvinen",
//     num: "040-123456",
//     id: 3
//   },
//   {
//     name: "Lea Kutvonen",
//     num: "040-123456",
//     id: 4
//   }
// ];

// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

// app.get("/notes", (req, res) => {
//   res.json(people);
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const app = require("./app");
const http = require("http");

const server = http.createServer(app);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
