class UnauthorizedError extends Error {// 401
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = message || 'Необходима авторизация';
  }
}

module.exports = {
  UnauthorizedError,
};
