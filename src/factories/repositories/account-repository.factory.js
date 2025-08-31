const AccountRepository = require('../../infrastructure/database/repositories/account.repository');
const { Sequelize, Account } = require('../../infrastructure/database/model');

module.exports = () => {
  return new AccountRepository({ sequelize: Sequelize, model: Account });
}