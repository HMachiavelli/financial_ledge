const GetAccountUsecase = require('../../domain/usecases/get-account.usecase');
const makeAccountRepository = require('../repositories/account-repository.factory');

module.exports = () => {
  const accountRepository = makeAccountRepository();

  return new GetAccountUsecase({ accountRepository });
}