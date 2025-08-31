module.exports = class Controller {
  handleError = (err) => {
    let response = {
      code: err.code || 500,
      message: 'Internal server error'
    };

    if(err.code === 400) {
      response.message = err.message;
    }

    if(err.code === 404) {
      response.message = 'Not found';
    }

    return response;
  }
}