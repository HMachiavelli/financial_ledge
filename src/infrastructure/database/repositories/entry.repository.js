const Repository = require('./repository');

class EntryRepository extends Repository {
  constructor(dependencies) {
    super(dependencies);
  }

  create = async (entryEntity) => {
    const entryData = entryEntity.toJSON();

    const entry = await this.model.create(entryData);

    return this.toEntity(entry);
  }

  toEntity = (model) => {
    return {
      id: model.id,
      direction: model.direction,
      accountId: model.accountId,
      amount: +model.amount,
    }
  }
}

module.exports = EntryRepository;