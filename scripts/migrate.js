const { Account, Entry, Transaction } = require('../src/infrastructure/database/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
migrate();

async function migrate() {
  // create tables
  await Account.sync({ force: true });
  await Entry.sync({ force: true });
  await Transaction.sync({ force: true });
}
