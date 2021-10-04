const db = require('../../data/db-config')

const getAll = async () => {
  return db('accounts')
}

const getById = async id => {
  const account = await db('accounts').where({ id: id }).first()
  return account
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return (newAccount)
}

const updateById = async (id, account) => {
  await db('accounts').where({ id: id }).update(account)
  const updatedAccount = await getById(id)
  return updatedAccount
}

const deleteById = async id => {

  const deleted = getById(id)
  await db('accounts').where({ id: id }).del()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
