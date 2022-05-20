const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  signout,
  deleteAccount,
  callback,
  kakao,
  naver,
  edit,
  github,
} = require("../controllers");
// const auth = require('../middleware/auth');

/* GET users listing. */
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.get("/delete", deleteAccount);
router.post("/callback", callback);
router.get("/kakao", kakao);
router.get("/naver", naver);
router.get("/github", github);
router.post("/edit", edit);
module.exports = router;
