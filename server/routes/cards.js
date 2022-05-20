const express = require("express");
const router = express.Router();
const { card, deleteCard } = require("../controllers");
const cardPostS3 = require("../controllers/cards/cardPostS3");
const cardPost = require("../controllers/cards/cardPost");
const cardUpload = require("../middleware/cardMulterS3");
const localCardUpload = require("../middleware/cardMulter");

/* GET POST card listing. */
router.get("/", card);
router.get("/delete/:id", deleteCard);

// local version : client 에서 보낸 이미지는 /server/public/uploads 에 들어갑니다.
// router.post("/post", localCardUpload.single("img"), cardPost);

// S3 version : client 에서 보낸 이미지는 S3 에 들어갑니다.
router.post("/post", cardUpload.single("img"), cardPostS3);
// router.post("/post", postCard);

module.exports = router;
