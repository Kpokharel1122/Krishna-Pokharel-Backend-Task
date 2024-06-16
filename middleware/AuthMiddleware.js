const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require('pino')()


function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const user = (req, res, next) => {
  const token = getToken(req);


  if (!token) {
    logger.error("Unauthorized Access! Please Login to continue")
    return res.status(403).json({
      message: "Unauthorized Access! Please Login to continue",
      success: false,
    });
  }

  // verfiying for token
  jwt.verify(token, process.env.SECRET_KEY ?? '', async function (err, decoded) {
    if (err) {
      logger.error("Invalid token")
      logger.error(err)
      return res.status(403).json({
        message: "Invalid Token",
        success: false,
      });
    } else {

// console.log(decoded)
      req.userId = decoded.userId;
      req.email = decoded.email
      req.name = decoded.name
      next();
    }
  });
};

module.exports = { user }