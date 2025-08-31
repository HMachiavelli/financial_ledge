const Controller = require("./controller");

module.exports = class CreateAccountController extends Controller {
  constructor({ createAccountUsecase }) {
    super();
    this.createAccountUsecase = createAccountUsecase;
  }

  execute = async (req, res) => {
    try {
      const response = await this.createAccountUsecase.execute({ name: req.body?.name, balance: +req.body.balance, direction: req.body.direction });

      return res.json(response);
    } catch (e) {
      const error = this.handleError(e);

      return res.status(error.code).json(error);
    }
  }
}