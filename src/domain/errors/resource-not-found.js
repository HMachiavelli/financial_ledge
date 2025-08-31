module.exports = class ResourceNotFoundError extends Error {
  constructor(message, options) {
    super(message, options);

    this.code = 404;
  }
}