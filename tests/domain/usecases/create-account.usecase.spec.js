const CreateAccountUsecase = require('../../../src/domain/usecases/create-account.usecase');
const InvalidParameterError = require('../../../src/domain/errors/invalid-parameter');

const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

let sut;
let input;

const params = {
  accountEntity: {
    build: mock.fn(),
    toJSON: mock.fn()
  },
  accountRepository: {
    create: mock.fn(),
    toEntity: mock.fn(),
    startTransaction: mock.fn(),
    finishTransaction: mock.fn(),
    undoTransaction: mock.fn(),
  }
}

describe('Test create account usecase', () => {
  beforeEach(() => {
    params.accountRepository.startTransaction.mock.resetCalls();
    params.accountRepository.finishTransaction.mock.resetCalls();
    params.accountRepository.undoTransaction.mock.resetCalls();

    input = {
      name: 'Test name',
      direction: 'debit',
      balance: 20050
    };

    sut = new CreateAccountUsecase(params);
  });

  it('should create account', async (t) => {
    params.accountRepository.create.mock.mockImplementationOnce(() => input);
    params.accountEntity.toJSON.mock.mockImplementationOnce((input) => input);

    const account = await sut.execute(input);

    assert.deepEqual(account, input);
  });

  it('should throw error if no initial balance', async () => {
    try {
      delete input.balance;
      await sut.execute(input);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Missing account initial balance');
    }
  });

  it('should throw error if no direction', async () => {
    try {
      delete input.direction;
      await sut.execute(input);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Missing account direction');
    }
  });
  
  it('should throw error if entity throws error', async () => {
    try {
      params.accountEntity.build.mock.mockImplementationOnce(() => { throw new Error('any error') });
      await sut.execute(input);
    } catch (err) {
      assert.equal(err instanceof Error, true);
      assert.equal(err.message, 'any error');
    }
  });
});