const InvalidParameterError = require("../errors/invalid-parameter");
const ResourceNotFoundError = require("../errors/resource-not-found");

module.exports = class GetAccountUsecase {
  constructor({ accountRepository }) {
    this.accountRepository = accountRepository;
  }

  execute = async ({ id }) => {
    if (!id) {
      throw new InvalidParameterError('Missing account ID');
    }

    const account = await this.accountRepository.findById(id);
    if(!account) {
      throw new ResourceNotFoundError('Account not found');
    }

    return this.accountRepository.toEntity(account);
  }
}