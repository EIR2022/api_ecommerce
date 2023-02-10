require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = email =>
  jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

const generateRefreshToken = email => {
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '15m',
  });

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
