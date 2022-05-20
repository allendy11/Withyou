const express = require("express");
const router = express.Router();
const { profile } = require("../controllers");
const profileUpload = require("../middleware/multerS3");
const localProfileUpload = require("../middleware/multer");
const upload = require("../controllers/profile/upload");
const uploadS3 = require("../controllers/profile/uploadS3");

router.get("/", profile.getProfile);
router.post("/", profile.editProfile);

// local version : client 에서 보낸 이미지는 /server/public/uploads 에 들어갑니다.
// router.put("/image", localProfileUpload.single("img"), upload);

// S3 version : client 에서 보낸 이미지는 S3 에 들어갑니다.
router.put("/image", profileUpload.single("img"), uploadS3);

module.exports = router;
