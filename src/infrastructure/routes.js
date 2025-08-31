const { 
  createAccountController,
  getAccountController,
  // createTransactionController,
} = require('../factories/controllers/controller.factory');

const setupRoutes = (app) => {
  app.post('/account',   createAccountController.execute);
  app.get('/account/:id',   getAccountController.execute);
  // app.post('/transaction', createTransactionController.execute);
};

module.exports = { setupRoutes }