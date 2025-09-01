const InvalidParameterError = require("../errors/invalid-parameter");

module.exports = class Transaction {
  build({ name, entries }) { 
    const entriesBalance = entries.reduce((acc, entry) => { 
      if(entry.direction === 'debit') return acc - entry.amount;
      return acc + entry.amount;
    }, 0); 

    if(entriesBalance !== 0) {
      throw new InvalidParameterError('Entries must balance to zero');
    }

    this.name = name;
    this.entries = entries;
  }

  toJSON() {
    let json = {
      name: this.name
    };

    if(this.entries.length) {
      json.entries = this.entries;
    }

    return json;
  }
}