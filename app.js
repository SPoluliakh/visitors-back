const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { logRouter, visitorsRouter, dataRouter } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/log", logRouter);
app.get("/visitors", visitorsRouter);
app.post("/data", dataRouter);

module.exports = app;
