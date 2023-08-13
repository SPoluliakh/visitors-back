// const axios = require("axios");
// const { Log } = require("../models/logModel");

// const logController = async (req, res) => {
//   const visitData = req.body;
//   // const ipAddress = requestIp.getClientIp(req);
//   // visitData.ipAddress = ipAddress;
//   //   console.log("qqqqqqqqqqqqq", visitData);

//   const ipInfoResponse = await axios.get(
//     `http://ip-api.com/json/${visitData.ipAddress}`
//   );
//   visitData.country = ipInfoResponse.data.country;

//   const newVisitor = await Log.create({ ...visitData });

//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       visitData: newVisitor,
//     },
//   });
// };

// // const logController = async (req, res) => {
// //   const visitData = req.body;

// //   // Получение информации о стране по IP-адресу
// //   const ipInfoResponse = await axios.get(
// //     `http://ip-api.com/json/${visitData.ipAddress}`
// //   );
// //   visitData.country = ipInfoResponse.data.country;

// //   // Получение адреса на основе координат (широты и долготы)
// //   const geocodeResponse = await axios.get(
// //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${visitData.lat},${visitData.lon}&key=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`
// //   );
// //   const address = geocodeResponse.data.results[0].formatted_address;
// //   visitData.address = address;

// //   // Создание нового посетителя в базе данных
// //   const newVisitor = await Log.create({ ...visitData });

// //   res.json({
// //     status: "success",
// //     code: 200,
// //     data: {
// //       visitData: newVisitor,
// //     },
// //   });
// // };

// module.exports = logController;

const axios = require("axios");
const { Log } = require("../models/logModel");

const IPSTACK_API_KEY = "8162f7d795affaa5efbb02529236038d";

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

  // const ipInfoResponse = await axios.get(
  //   `http://ip-api.com/json/${visitData.ipAddress}`
  // );
  // visitData.country = ipInfoResponse.data.country;
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
