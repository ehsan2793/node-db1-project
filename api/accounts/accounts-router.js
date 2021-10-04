const router = require('express').Router()
const Module = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware') //eslint-disable-line
router.get('/', async (req, res, next) => {
  try {
    const accounts = await Module.getAll()
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  res.status(200).json(req.found)
})


router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const newAccount = await Module.create(req.body)
  res.status(201).json(newAccount)
})


//eslint-disable-next-line
router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});
//eslint-disable-next-line
router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
