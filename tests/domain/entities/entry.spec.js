const Entry = require('../../../src/domain/entities/entry');
const InvalidParameterError = require('../../../src/domain/errors/invalid-parameter');

const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

let sut;

const data = {
  accountId: 'anyAccountId',
  direction: 'debit',
  amount: 10000
};

describe('Test entry entity', () => {
  beforeEach(() => {
    sut = new Entry();
  });

  it('should build entry', async (t) => {
    sut.build(data);

    assert.equal(data.accountId, sut.accountId);
    assert.equal(data.direction, sut.direction);
    assert.equal(data.amount, sut.amount);
  });

  it('should throw error if invalid amount', async () => {
    try {
      data.balance = -1;
      sut.build(data);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Balance cannot be negative');
    }
  });
  
  it('should throw error if invalid direction', async () => {
    try {
      data.direction = 'dredit';
      sut.build(data);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Invalid entry direction');
    }
  });
});