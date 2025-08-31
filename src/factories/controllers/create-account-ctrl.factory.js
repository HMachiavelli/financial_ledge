const CreateAccountController = require('../../presentation/controllers/create-account.ctrl');
const makeUsecase = require('../usecases/create-account-usecase.factory');

module.exports = () => {
  const createAccountUsecase = makeUsecase();

  return new CreateAccountController({ createAccountUsecase });
}
