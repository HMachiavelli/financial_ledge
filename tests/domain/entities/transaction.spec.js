const Transaction = require('../../../src/domain/entities/transaction');
const InvalidParameterError = require('../../../src/domain/errors/invalid-parameter');

const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

let sut;

const data = {
  name: 'Test name',
  entries: [
    { amount: 100, direction: 'credit' },
    { amount: 100, direction: 'debit' },
  ]
};

describe('Test transaction entity', () => {
  beforeEach(() => {
    sut = new Transaction();
  });

  it('should build transaction', async (t) => {
    sut.build(data);

    assert.equal(data.name, sut.name);
    assert.equal(data.entries, sut.entries);
  });

  it('should throw error if invalid entry balance with amount', async () => {
    try {
      data.entries[0].amount = 101;
      sut.build(data);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Entries must balance to zero');
    }
  });
  
  it('should throw error if invalid entry balance with direction', async () => {
    try {
      data.entries[1].direction = 'credit';
      sut.build(data);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Entries must balance to zero');
    }
  });
});