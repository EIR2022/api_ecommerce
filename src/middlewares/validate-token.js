/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: 'FAIL', error: 'Token no presente' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, obj) => {
      if (err) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send({ status: 'FAIL', error: 'Token invalido' });
      }
      req.email = obj.email;
      next();
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 'FAIL', error: err });
  }
};

module.exports = validateToken;
