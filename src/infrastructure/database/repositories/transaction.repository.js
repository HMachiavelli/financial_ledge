const Repository = require('./repository');

class TransactionRepository extends Repository {
  constructor(dependencies) {
    super(dependencies);
  }

  create = async (transactionEntity) => {
    const transactionData = transactionEntity.toJSON();
  
    const transaction = await this.model.create(transactionData);

    return this.toEntity(transaction);
  }

  toEntity = (model) => {
    let entity = {
      id: model.id,
      name: model.name
    }

    if(model.entries) {
      entity.entries = model.entries.map(entry => ({
        id: entry.id,
        direction: entry.direction,
        accountId: entry.accountId,
        amount: +entry.amount,
      }));
    }

    return entity;
  }
}

module.exports = TransactionRepository;