const dayjs = require("dayjs");
const _ = require("lodash");

module.exports = function (res, user, token) {
  const options = {
    httpOnly: true,
    // expires: new Date(Date.now() + 100000),
    expires: dayjs().add(30, "days").toDate(),
    // secure: process.env.NODE_ENV !== "DEVELOPMENT",
    // sameSite: "none",
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      user: _.assign(_.omit(user.dataValues, ["password"])),
      token,
    });
};
