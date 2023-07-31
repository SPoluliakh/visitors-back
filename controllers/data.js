const axios = require("axios");
const { Log } = require("../models/logModel");

const logDataController = async (req, res) => {
  const { body } = req;

  const ipInfoResponse = await axios.get(
    `http://ip-api.com/json/${body.ipAddress}`
  );
  body.country = ipInfoResponse.data.country;

  await Log.create({ ...body });
};

module.exports = logDataController;
