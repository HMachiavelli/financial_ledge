const InvalidParameterError = require("../errors/invalid-parameter");

module.exports = class CreateAccountUsecase {
  constructor({ transactionEntity, accountRepository, transactionRepository, entryRepository }) {
    this.transactionEntity = transactionEntity;
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.entryRepository = entryRepository;
  }

  execute = async (input) => {
    if (!input.entries) {
      throw new InvalidParameterError('Missing transaction entries');
    }

    try {
      this.transactionRepository.startTransaction();

      this.transactionEntity.build({
        name: input?.name,
        entries: input.entries
      });

      let transaction = await this.transactionRepository.create(this.transactionEntity);
      transaction.entries = this.handleEntries(input.entries, transaction.id);

      this.transactionRepository.finishTransaction();

      return transaction;
    } catch (e) {
      this.transactionRepository.undoTransaction();

      throw e;
    }
  }

  handleEntries = async (entries, transactionId) => {
    let response = [];
    for (let entry of entries) {
      const account = await this.accountRepository.findById(entry.accountId);
      if (!account) {
        throw new InvalidParameterError(`Account ID ${entry.accountId} not found`);
      }

      entry.transactionId = transactionId;

      this.entryEntity.build(entry);
      response.push(await this.entryRepository.create(this.entryEntity));

      await this.handleAccountBalance(account, entry);
    }

    return response;
  }

  handleAccountBalance = async (account, entry) => {
    if(account.direction !== entry.direction) {
      entry.amount = entry.amount * -1;
    }

    await this.accountRepository.updateBalance(entry.accountId, entry.amount);
  }
}