const axios = require("axios");
const { Log } = require("../models/logModel");

const logController = async (req, res) => {
  const visitData = req.body;
  // const ipAddress = requestIp.getClientIp(req);
  // visitData.ipAddress = ipAddress;
  //   console.log("qqqqqqqqqqqqq", visitData);

  const ipInfoResponse = await axios.get(
    `http://ip-api.com/json/${visitData.ipAddress}`
  );
  visitData.country = ipInfoResponse.data.country;

  console.log("/////////", visitData);
  const newVisitor = await Log.create({ ...visitData });

  res.json({
    status: "success",
    code: 200,
    data: {
      visitData: newVisitor,
    },
  });
};

module.exports = logController;
