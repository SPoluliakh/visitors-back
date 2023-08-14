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

const logDataController = async (req, res) => {
  const visitData = req.body;
  const ipInfo = await getGeoLocationByIP(visitData.ipAddress);

  visitData.country = ipInfo;

  await Log.create({ ...visitData });
};

module.exports = logDataController;
