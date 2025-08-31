const GetAccountUsecase = require('../../../src/domain/usecases/get-account.usecase');
const InvalidParameterError = require('../../../src/domain/errors/invalid-parameter');
const ResourceNotFoundError = require('../../../src/domain/errors/resource-not-found');

const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

let sut;
let input = {
  id: 1
};

const account = {
  id: 1,
  name: 'Test account',
  balance: 1000,
  direction: 'credit'
}

const params = {
  accountRepository: {
    findById: mock.fn(),
    toEntity: mock.fn()
  }
}

describe('Test get account usecase', () => {
  beforeEach(() => {
    sut = new GetAccountUsecase(params);
  });

  it('should get account', async () => {
    params.accountRepository.findById.mock.mockImplementationOnce(() => account);
    params.accountRepository.toEntity.mock.mockImplementationOnce((account) => account);

    const accountCreated = await sut.execute(input);

    assert.deepEqual(account, accountCreated);
  });
  
  it('should throw error if no account found', async () => {
    try {
      params.accountRepository.findById.mock.mockImplementationOnce(() => null);
      await sut.execute(input);
    } catch (err) {
      assert.equal(err instanceof ResourceNotFoundError, true);
      assert.equal(err.message, 'Account not found');
    }
  });

  it('should throw error if no ID', async () => {
    try {
      delete input.id;
      await sut.execute(input);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Missing account ID');
    }
  });
});