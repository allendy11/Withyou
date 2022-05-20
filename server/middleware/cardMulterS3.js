require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const bucket = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_IAM_USER_KEY;
const secretAccessKey = process.env.AWS_IAM_USER_SECRET;
const region = process.env.AWS_S3_REGION;
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

const cardUpload = multer({
  storage: multerS3({
    s3,
    bucket: `${bucket}/uploads/mycard`,
    // ACL: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
}); // S3로 이미지 업로드

module.exports = cardUpload;
