class InternalServerError extends Error {// 500
  constructor(message) {
    super(message);
    this.status = 500;
    this.message = message || 'Ошибка подключения к серверу';
  }
}

module.exports = {
  InternalServerError,
};
