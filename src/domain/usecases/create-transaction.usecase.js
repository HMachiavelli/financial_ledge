const InvalidParameterError = require("../errors/invalid-parameter");

module.exports = class CreateAccountUsecase {
  constructor({ transactionEntity, entryEntity, accountRepository, transactionRepository, entryRepository }) {
    this.transactionEntity = transactionEntity;
    this.entryEntity = entryEntity;
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
      transaction.entries = await this.handleEntries(input.entries, transaction.id);

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
      const account = await this.accountRepository.findById(entry.account_id);
      if (!account) {
        throw new InvalidParameterError(`Account ID ${entry.accountId} not found`);
      }

      this.entryEntity.build({
        accountId: entry.account_id,
        transactionId,
        direction: entry.direction,
        amount: entry.amount
      });
      response.push(await this.entryRepository.create(this.entryEntity));

      await this.handleAccountBalance(account);
    }

    return response;
  }

  handleAccountBalance = async (account) => {
    let amount = this.entryEntity.amount;
    if(account.direction !== this.entryEntity.direction) {
      amount = this.entryEntity.amount * -1;
    }

    const updatedBalance = account.balance + amount;

    console.log(this.entryEntity.accountId, updatedBalance);

    await this.accountRepository.updateBalance(this.entryEntity.accountId, updatedBalance);
  }
}