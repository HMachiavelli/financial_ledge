class Repository {
  constructor({ sequelize, model }) {
    this.sequelize = sequelize;
    this.model = model;
    this.transaction = null;
  }

  startTransaction = async () => {
    this.transaction = await this.model.sequelize.transaction();
  }
  
  finishTransaction = async () => {
    await this.transaction.commit();
    this.transaction = null;
  }
  
  undoTransaction = async () => {
    await this.transaction.rollback();
    this.transaction = null;
  }

  findById = async (id) => {
    let options = { 
      where: {
        id
      }
    };

    if(this.transaction) {
      options.transaction = this.transaction;
    }

    return this.model.findOne(options);
  }
}

module.exports = Repository;