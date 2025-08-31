const Controller = require("./controller");

module.exports = class GetAccountController extends Controller {
  constructor({ getAccountUsecase }) {
    super();
    this.getAccountUsecase = getAccountUsecase;
  }

  execute = async (req, res) => {
    try {
      const response = await this.getAccountUsecase.execute({ id: +req.params.id });

      return res.json(response);
    } catch (e) {
      const error = this.handleError(e);

      return res.status(error.code).json(error);
    }
  }
}