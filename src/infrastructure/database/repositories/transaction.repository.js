const Repository = require('./repository');

class TransactionRepository extends Repository {
  constructor(dependencies) {
    super(dependencies);
  }
}

module.exports = TransactionRepository;