const { getById } = require('./accounts-model');


const checkAccountPayload = async (req, res, next) => {
  next()
}
const checkAccountNameUnique = (req, res, next) => {
  next()
};

const checkAccountId = async (req, res, next) => {
  const found = await getById(req.params.id);
  try {
    if (!found) {
      res.status(404).json({ message: 'Account not found' });
    } else {
      req.found = found;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};
