const InvalidParameterError = require('../errors/invalid-parameter');

module.exports = class Account {
  ACCOUNT_DIRECTIONS = ['debit', 'credit'];
 
  build = ({ name, direction, balance }) => {    
    if(!this.ACCOUNT_DIRECTIONS.includes(direction)) {
      throw new InvalidParameterError('Invalid account direction');
    }

    if(balance < 0) {
      throw new InvalidParameterError('Balance cannot be negative');
    }
    
    this.name = name;
    this.direction = direction;
    this.balance = balance;
  }

  toJSON() {
    return {
      name: this.name,
      direction: this.direction,
      balance: +this.balance
    };
  }
}