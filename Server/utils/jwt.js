const jwt = require('jsonwebtoken');


// Fungsi untuk meng-generate token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });
};

// Fungsi untuk memverifikasi token JWT
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};
