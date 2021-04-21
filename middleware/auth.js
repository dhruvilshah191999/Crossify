const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var CryptoJS = require("crypto-js");
const secret = process.env.SECRET;

module.exports = function (req, res, next) {
  const token = req.body.token;
  if (!token)
    return res
      .status(500)
      .send({ is_error: true, message: "Access denied, Token not provided" });

  try {
    var bytes = CryptoJS.AES.decrypt(token, secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const decoded = jwt.verify(decryptedData, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(500).send({ is_error: true, message: "Invalid token" });
  }
};
