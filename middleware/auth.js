const jwt = require('jsonwebtoken');
const config = require('config');
var CryptoJS = require('crypto-js');
const secret = config.get('Secret');

module.exports = function (req, res, next) {
  const token = req.body.token;
  if (!token)
    return res
      .status(500)
      .send({ is_error: true, message: 'Access denied, Token not provided' });

  try {
    var bytes = CryptoJS.AES.decrypt(token, secret);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const decoded = jwt.verify(decryptedData, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(500).send({ is_error: true, message: 'Invalid token' });
  }
};
