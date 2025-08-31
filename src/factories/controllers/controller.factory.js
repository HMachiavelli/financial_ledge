const makeCreateAccountController = require('./create-account-ctrl.factory');
const makeGetAccountController = require('./get-account-ctrl.factory');
// const makeCreateTransactionController = require('./create-transaction-ctrl.factory');

const createAccountController = makeCreateAccountController();
const getAccountController = makeGetAccountController();
// const createTransactionController = makeCreateTransactionController();

module.exports = {
  createAccountController,
  getAccountController,
  // createTransactionController
}