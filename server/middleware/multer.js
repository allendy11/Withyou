const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads/myimage',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const localProfileUpload = multer({
  storage: storage,
});

module.exports = localProfileUpload;
