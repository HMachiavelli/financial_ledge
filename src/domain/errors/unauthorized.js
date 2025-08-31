module.exports = class UnauthorizedError extends Error {
  constructor(message, options) {
    super(message, options);

    this.code = 401;
  }
}