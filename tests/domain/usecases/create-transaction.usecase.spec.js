const CreateTransactionUsecase = require('../../../src/domain/usecases/create-transaction.usecase');
const InvalidParameterError = require('../../../src/domain/errors/invalid-parameter');

const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

let sut;
let input;
let account;

const params = {
  transactionEntity: {
    build: mock.fn(),
    toJSON: mock.fn()
  },
  entryEntity: {
    build: mock.fn(),
    toJSON: mock.fn()
  },
  transactionRepository: {
    create: mock.fn(),
    toEntity: mock.fn(),
    startTransaction: mock.fn(),
    finishTransaction: mock.fn(),
    undoTransaction: mock.fn(),
  },
  entryRepository: {
    create: mock.fn(),
    toEntity: mock.fn(),
  },
  accountRepository: {
    findById: mock.fn(),
    updateBalance: mock.fn(),
    toEntity: mock.fn(),
  },
}

describe('Test create transaction usecase', () => {
  beforeEach(() => {
    params.transactionRepository.startTransaction.mock.resetCalls();
    params.transactionRepository.finishTransaction.mock.resetCalls();
    params.transactionRepository.undoTransaction.mock.resetCalls();

    input = {
      name: 'Test name',
      entries: [
        {
          account_id: 1,
          direction: 'debit',
          amount: 1234
        },
        {
          account_id: 2,
          direction: 'credit',
          amount: 1234
        }
      ]
    };

    account = {
      id: 1,
      name: 'any_name',
      direction: 'debit',
      balance: 100012
    };

    sut = new CreateTransactionUsecase(params);
  });

  it('should create transaction', async (t) => {
    params.transactionRepository.create.mock.mockImplementationOnce(() => ({ id: 1, ...input }));
    params.entryRepository.create.mock.mockImplementation(() => input.entries[0]);
    params.accountRepository.findById.mock.mockImplementation(() => account);
    params.accountRepository.updateBalance.mock.mockImplementation(() => account);

    const transaction = await sut.execute(input);

    const expected = {
      id: 1,
      name: input.name,
      entries: [
        input.entries[0],
        input.entries[0],
      ]
    }

    const call1 = params.accountRepository.updateBalance.mock.calls[0];
    const call2 = params.accountRepository.updateBalance.mock.calls[1];

    assert.deepEqual(transaction, expected);
  });

  it('should throw error if no entries', async () => {
    try {
      delete input.entries;
      await sut.execute(input);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Missing transaction entries');
    }
  });
  
  it('should throw error if transaction build fails', async () => {
    try {
      params.transactionEntity.build.mock.mockImplementationOnce(() => { throw new Error('any error') });
      await sut.execute(input);
    } catch (err) {
      assert.equal(params.transactionRepository.undoTransaction.mock.callCount(), 1);
      assert.equal(err instanceof Error, true);
      assert.equal(err.message, 'any error');
    }
  });
  
  it('should throw error if entry build fails', async () => {
    try {
      params.transactionRepository.create.mock.mockImplementationOnce(() => ({ id: 1, ...input }));

      params.entryEntity.build.mock.mockImplementationOnce(() => { throw new Error('any error') });
      await sut.execute(input);
    } catch (err) {
      assert.equal(params.transactionRepository.undoTransaction.mock.callCount(), 1);
      assert.equal(err instanceof Error, true);
      assert.equal(err.message, 'any error');
    }
  });
});