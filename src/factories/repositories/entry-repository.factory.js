const EntryRepository = require('../../infrastructure/database/repositories/entry.repository');
const { Sequelize, Entry } = require('../../infrastructure/database/model');

module.exports = () => {
  return new EntryRepository({ sequelize: Sequelize, model: Entry });
}