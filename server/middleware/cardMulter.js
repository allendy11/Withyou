const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads/mycard',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const localCardUpload = multer({
  storage: storage,
});

module.exports = localCardUpload;
