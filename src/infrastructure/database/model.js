const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Account extends Sequelize.Model {}
Account.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    balance:{
      type:Sequelize.BIGINT
    },
    direction: {
      type: Sequelize.ENUM('debit', 'credit')
    }
  },
  {
    sequelize,
    modelName: 'Account'
  }
);

class Entry extends Sequelize.Model {}
Entry.init(
  {
    amount: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    direction: {
      type: Sequelize.ENUM('debit','credit')
    }
  },
  {
    sequelize,
    modelName: 'Entry'
  }
);

class Transaction extends Sequelize.Model {}
Transaction.init(
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Transaction'
  }
);

Account.hasMany(Entry, {as :'entries',foreignKey:'entry_id'})
Entry.belongsTo(Account, {as: 'account'})
Transaction.hasMany(Entry, {as : 'entries', foreignKey:'entry_id'})
Entry.belongsTo(Transaction, {as: 'transaction'})

module.exports = {
  Sequelize,
  sequelize,
  Account,
  Transaction,
  Entry
};
