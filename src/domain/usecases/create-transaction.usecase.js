const InvalidParameterError = require("../errors/invalid-parameter");

module.exports = class CreateAccountUsecase {
  constructor({ accountEntity, accountRepository }) {
    this.accountEntity = accountEntity;
    this.accountRepository = accountRepository;
  }

  execute = async ({ name, balance, direction }) => {
    if(!balance) {
      throw new InvalidParameterError('Missing account initial balance');
    }

    if(!direction) {
      throw new InvalidParameterError('Missing account direction');
    }

    this.accountEntity.build({ name, balance, direction });

    try {
      this.accountRepository.startTransaction();

      await this.accountRepository.create(this.accountEntity);

      this.accountRepository.finishTransaction();

      return this.accountEntity.toJSON();
    } catch(e) {
      console.log(e);
      this.accountRepository.undoTransaction();

      throw e;
    }
  }
}