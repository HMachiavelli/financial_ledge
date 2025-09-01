const { 
  createAccountController,
  getAccountController,
  createTransactionController,
} = require('../factories/controllers/controller.factory');

const setupRoutes = (app) => {
  app.post('/accounts', createAccountController.execute);
  app.get('/accounts/:id', getAccountController.execute);
  app.post('/transactions', createTransactionController.execute);
};

module.exports = { setupRoutes }