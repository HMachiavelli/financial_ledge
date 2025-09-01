const InvalidParameterError = require('../errors/invalid-parameter');

module.exports = class Entry {
  ENTRY_DIRECTIONS = ['debit', 'credit'];
 
  build({ transactionId, accountId, direction, amount }) {    
    console.log(transactionId, accountId, direction, amount); 
    if(!this.ENTRY_DIRECTIONS.includes(direction)) {
      throw new InvalidParameterError('Invalid entry direction');
    }

    if(amount < 0) {
      throw new InvalidParameterError('Entry amount cannot be negative');
    }
    
    this.transactionId = transactionId;
    this.accountId = accountId;
    this.direction = direction;
    this.amount = amount;
  }

  toJSON() {
    return {
      direction: this.direction,
      amount: +this.amount,
      transactionId: this.transactionId,
      accountId: this.accountId,
    };
  }
}