module.exports = class InvalidParameterError extends Error {
  constructor(message, options) {
    super(message, options);

    this.code = 400;
  }
}