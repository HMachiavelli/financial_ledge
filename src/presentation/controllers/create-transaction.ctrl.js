const Controller = require("./controller");

module.exports = class CreateTransactionController extends Controller {
  constructor({ createTransactionUsecase }) {
    super();
    this.createTransactionUsecase = createTransactionUsecase;
  }

  execute = async (req, res) => {
    try {
      const response = await this.createTransactionUsecase.execute({ amount: +req.body.amount, user: req.profile });

      return res.json(response);
    } catch (e) {
      const error = this.handleError(e);

      return res.status(error.code).json(error);
    }
  }
}