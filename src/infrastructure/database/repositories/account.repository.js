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

  updateBalance = async (accountId, balance) => {
    let options = {
      where: { id: accountId }
    };

    if(this.transaction) {
      options.transaction = this.transaction;
    }

    const data = {
      balance
    };

    const updated = await this.model.update(data, options);

    return this.toEntity(updated);
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