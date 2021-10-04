const { getById, getAll } = require('./accounts-model');

const checkAccountPayload = async (req, res, next) => {

  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    next({ status: 400, message: 'name and budget are required' })
  } else if (typeof name !== 'string') {
    next({ status: 400, message: "name of account must be a string" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== 'number') {
    next({ status: 400, message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {

    next({ status: 400, message: "budget of account is too large or too small" })
  } else {
    req.body = { name: name.trim(), budget: budget }
    next()
  }

}

const checkAccountNameUnique = async (req, res, next) => {
  try {

    const allAccounts = await getAll()
    allAccounts.find(account => {
      if (account.name === req.body.name) {
        next({ status: 400, message: "that name is taken" })
      }
    })
    next()
  } catch (error) {
    next(error)
  }

}

const checkAccountId = async (req, res, next) => {
  const found = await getById(req.params.id);
  try {
    if (!found) {
      next({ status: 404, message: 'Account not found' });
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
