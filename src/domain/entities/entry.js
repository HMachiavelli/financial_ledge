const InvalidParameterError = require('../errors/invalid-parameter');

module.exports = class Entry {
  ENTRY_DIRECTIONS = ['debit', 'credit'];
 
  build({ accountId, direction, amount }) {    
    if(!this.ENTRY_DIRECTIONS.includes(direction)) {
      throw new InvalidParameterError('Invalid entry direction');
    }

    if(amount < 0) {
      throw new InvalidParameterError('Entry amount cannot be negative');
    }
    
    this.accountId = accountId;
    this.direction = direction;
    this.amount = amount;
  }
}