const Repository = require('./repository');

class EntryRepository extends Repository {
  constructor(dependencies) {
    super(dependencies);
  }
}

module.exports = EntryRepository;