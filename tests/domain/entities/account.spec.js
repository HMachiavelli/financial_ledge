const Account = require('../../../src/domain/entities/account');
const InvalidParameterError = require('../../../src/domain/errors/invalid-parameter');

const { describe, it, mock, beforeEach } = require('node:test');
const assert = require('node:assert');

let sut;

const data = {
  name: 'Test name',
  direction: 'debit',
  balance: 20050
};

describe('Test account entity', () => {
  beforeEach(() => {
    sut = new Account();
  });

  it('should build account', async (t) => {
    sut.build(data);

    assert.equal(data.name, sut.name);
    assert.equal(data.direction, sut.direction);
    assert.equal(data.balance, sut.balance);
  });

  it('should throw error if invalid balance', async () => {
    try {
      data.balance = -20050;
      sut.build(data);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Balance cannot be negative');
    }
  });
  
  it('should throw error if invalid direction', async () => {
    try {
      data.direction = 'crebit';
      sut.build(data);
    } catch (err) {
      assert.equal(err instanceof InvalidParameterError, true);
      assert.equal(err.message, 'Invalid account direction');
    }
  });
});