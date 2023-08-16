class ForbiddenError extends Error {// 403
  constructor(message) {
    super(message);
    this.status = 403;
    this.message = message || 'Заполните обязательные поля';
  }
}

module.exports = {
  ForbiddenError,
};
