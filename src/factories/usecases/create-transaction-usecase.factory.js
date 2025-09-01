const CreateTransactionUsecase = require('../../domain/usecases/create-transaction.usecase');
const makeAccountRepository = require('../repositories/account-repository.factory');
const makeTransactionRepository = require('../repositories/transaction-repository.factory');
const makeEntryRepository = require('../repositories/entry-repository.factory');
const makeEntryEntity = require('../entities/entry-entity.factory');
const makeTransactionEntity = require('../entities/transaction-entity.factory');

module.exports = () => {
  const accountRepository = makeAccountRepository();
  const transactionRepository = makeTransactionRepository();
  const entryRepository = makeEntryRepository();
  const transactionEntity = makeTransactionEntity();
  const entryEntity = makeEntryEntity();

  return new CreateTransactionUsecase({ transactionEntity, entryEntity, accountRepository, transactionRepository, entryRepository });
}