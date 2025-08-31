const CreateTransactionController = require('../../presentation/controllers/create-transaction.ctrl');
const makeUsecase = require('../usecases/create-transaction-usecase.factory');

module.exports = () => {
  const createTransactionUsecase = makeUsecase();

  return new CreateTransactionController({ createTransactionUsecase });
}
