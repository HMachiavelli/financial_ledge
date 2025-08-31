const TransactionRepository = require('../../infrastructure/database/repositories/transaction.repository');
const { Sequelize, Transaction } = require('../../infrastructure/database/model');

module.exports = () => {
  return new TransactionRepository({ sequelize: Sequelize, model: Transaction });
}