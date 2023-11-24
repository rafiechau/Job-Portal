
const multer = require('multer');
const path = require('path');

// Konfigurasi storage untuk menentukan lokasi dan nama file yang disimpan
const cvStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads', 'cv')); // Lokasi penyimpanan file
  },
  filename: function(req, file, cb) {
    // Membuat nama file unik untuk menghindari penimpaan file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter tipe file yang diperbolehkan
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Terima file jika bertipe PDF
  } else {
    cb(new Error('File bukan PDF'), false); // Tolak file selain PDF
  }
};

// Middleware upload Multer
const upload = multer({
  storage: cvStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Batas maksimal ukuran file 5MB
  }
});

module.exports = upload;
