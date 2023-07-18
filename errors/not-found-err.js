class NotFoundError extends Error {// 404
  constructor(message) {
    super(message);
    this.status = 404;
    this.message = message || 'Запрашиваемый объект не найден';
  }
}

module.exports = {
  NotFoundError,
};
