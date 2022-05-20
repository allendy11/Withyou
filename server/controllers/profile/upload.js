const { User } = require("../../models");
const auth = require("../../middleware/auth");
module.exports = async (req, res) => {
  try {
    const authHeader = await auth(req);
    if (!authHeader) {
      return res
        .status(400)
        .send({ data: null, message: "invalid access token" });
    }
    const profileUrl = await req.file.path; // 이미지 URL 정보가 담긴 곳
    console.log(req.file);
    await User.update(
      { image: profileUrl },
      { where: { email: authHeader.email } }
    );
    const userInfo = await User.findOne({ where: { email: authHeader.email } });
    res.send({
      image: `server/${userInfo.dataValues.image}`,
      message: "프로필 사진이 등록되었습니다.",
    });
  } catch (err) {
    console.log("err.message");
    res.send({ message: "upload err" });
  }
};
