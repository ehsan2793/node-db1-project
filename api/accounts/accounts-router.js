const router = require('express').Router();
const Module = require('./accounts-model');
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Module.getAll();
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkAccountId, async (req, res) => {
  res.status(200).json(req.found);
});

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res) => {
    console.log(req.body);
    const newAccount = await Module.create(req.body);

    res.status(201).json(newAccount);

  }
);

//eslint-disable-next-line
router.put(
  '/:id',
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  async (req, res) => {
    const updatedAccount = await Module.updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  },
);
//eslint-disable-next-line
router.delete('/:id', checkAccountId, async (req, res, next) => {
  const deletedAccount = await Module.deleteById(req.params.id)
  res.status(200).json(deletedAccount);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
