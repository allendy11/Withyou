const { Card } = require("../../models");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  console.log(req.file);
  try {
    const authHeader = await auth(req);
    if (!authHeader) {
      return res
        .status(400)
        .send({ data: null, message: "invalid access token" });
    }
    const cardUrl = await req.file.path; // 이미지 URL 정보가 담긴 곳\

    const cardUp = await Card.create({
      user_id: authHeader.id,
      card: cardUrl,
    });
    res.status(201).json({
      card: cardUp.dataValues.card,
      message: "데이터가 저장되었습니다.",
    });
  } catch (err) {
    console.log("err.message");
    res.send({ message: "upload err" });
  }
};
