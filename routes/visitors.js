const express = require("express");
const { cntrlWrap } = require("../helpers");
const { getVisitors } = require("../controllers");

const visitorsRouter = express.Router();

visitorsRouter.get("/visitors", cntrlWrap(getVisitors));

module.exports = visitorsRouter;
