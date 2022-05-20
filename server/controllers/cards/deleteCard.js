const { Card } = require('../../models');
const auth = require('../../middleware/auth');

module.exports = async (req, res) => {
  const authHeader = auth(req);
  if (!authHeader) {
    res.status(404).send({ message: 'not authrized' });
  }
  const { id } = req.params;
  await Card.destroy({
    where: {
      id,
    },
  }).then(() => {
    res.sendStatus(204);
  });
};
