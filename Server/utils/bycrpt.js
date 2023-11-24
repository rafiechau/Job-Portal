const bcrypt = require('bcrypt');
const saltRounds = 10;

// Fungsi untuk meng-hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

// Fungsi untuk membandingkan password dan hash
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
  
module.exports = {
    hashPassword,
    comparePassword
};