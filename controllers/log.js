const axios = require("axios");

const logController = async (req, res) => {
  const visitData = req.body;
  // const ipAddress = requestIp.getClientIp(req);
  // visitData.ipAddress = ipAddress;
  //   console.log("qqqqqqqqqqqqq", visitData);

  const ipInfoResponse = await axios.get(
    `http://ip-api.com/json/${visitData.ipAddress}`
  );
  visitData.country = ipInfoResponse.data.country;

  // console.log("/////////", visitData);
  res.json({
    status: "success",
    code: 200,
    data: {
      visitData,
    },
  });
};

module.exports = logController;
