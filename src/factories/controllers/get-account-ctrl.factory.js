const GetAccountController = require('../../presentation/controllers/get-account.ctrl');
const makeUsecase = require('../usecases/get-account-usecase.factory');

module.exports = () => {
  const getAccountUsecase = makeUsecase();

  return new GetAccountController({ getAccountUsecase });
}
