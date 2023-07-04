const { Log } = require("../models/logModel");

const getVisitors = async (req, res) => {
  const visitors = await Log.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      visitors,
    },
  });
};

module.exports = getVisitors;
