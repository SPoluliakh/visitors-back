const axios = require("axios");
const { Log } = require("../models/logModel");

const { IPSTACK_API_KEY } = process.env;

async function getGeoLocationByIP(ipAddress) {
  try {
    const response = await axios.get(
      `http://api.ipstack.com/${ipAddress}?access_key=${IPSTACK_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching IP information:", error.message);
    return null;
  }
}

const logController = async (req, res) => {
  const visitData = req.body;
  const ipInfo = await getGeoLocationByIP(visitData.ipAddress);

  visitData.country = ipInfo;

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
