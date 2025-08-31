const InvalidParameterError = require("../errors/invalid-parameter");

module.exports = class CreateAccountUsecase {
  constructor({ accountEntity, accountRepository }) {
    this.accountEntity = accountEntity;
    this.accountRepository = accountRepository;
  }

  execute = async (input) => {
    if (input.balance === undefined) {
      throw new InvalidParameterError('Missing account initial balance');
    }

    if (!input.direction) {
      throw new InvalidParameterError('Missing account direction');
    }

    try {
      this.accountRepository.startTransaction();
      
      this.accountEntity.build({
        name: input?.name,
        balance: +input.balance,
        direction: input.direction
      });

      const account = await this.accountRepository.create(this.accountEntity);

      this.accountRepository.finishTransaction();

      return account;
    } catch (e) {
      console.log(e);
      this.accountRepository.undoTransaction();

      throw e;
    }
  }
}