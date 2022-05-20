const { Card, User } = require('../../models');
const auth = require('../../middleware/auth');

module.exports = async (req, res) => {
  const authHeader = await auth(req);

  if (!authHeader) {
    res.status(400).send({ data: null, message: 'invalid access token' });
  }
  const cards = await Card.findAll({
    include: {
      model: User,
    },
    where: {
      user_id: authHeader.id,
    },
  });
  if (!cards) {
    return res.status(404).send({ message: 'not found' });
  }
  const card = cards.map((el) => {
    return {
      id: el.id,
      card: el.card,
    };
  });
  res.status(200).send(card);
};
