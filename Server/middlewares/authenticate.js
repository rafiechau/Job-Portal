// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { verifyToken } = require("../utils/jwt");


const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  const token = bearerToken.replace('Bearer', '').trim()
  // console.log(token)
  try {
    // Verifikasi token
    const decoded = verifyToken(token)
    // console.log(dec)
    req.user = decoded;
    // console.log(decoded)
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token.' });
    }
    res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authenticate;
