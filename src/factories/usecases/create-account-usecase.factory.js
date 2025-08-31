const CreateAccountUsecase = require('../../domain/usecases/create-account.usecase');
const makeAccountRepository = require('../repositories/account-repository.factory');
const makeAccountEntity = require('../entities/account-entity.factory');

module.exports = () => {
  const accountRepository = makeAccountRepository();
  const accountEntity = makeAccountEntity();

  return new CreateAccountUsecase({ accountEntity, accountRepository });
}