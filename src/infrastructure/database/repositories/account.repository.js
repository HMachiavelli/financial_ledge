const Repository = require('./repository');

class AccountRepository extends Repository {
  constructor(dependencies) {
    super(dependencies);
  }

  create = async (accountEntity) => {
    const accountData = accountEntity.toJSON();
  
    const account = await this.model.create(accountData);

    return this.toEntity(account);
  }

  toEntity = (model) => {
    return {
      id: model.id,
      name: model.name,
      direction: model.direction,
      balance: +model.balance
    }
  }
}

module.exports = AccountRepository;