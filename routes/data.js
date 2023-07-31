const express = require("express");
const { logDataController } = require("../controllers");
const { cntrlWrap } = require("../helpers");

const dataRouter = express.Router();

dataRouter.post("/data", cntrlWrap(logDataController));

module.exports = dataRouter;
