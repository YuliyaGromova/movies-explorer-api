class UniqueError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.message = message || 'Пользователь с таким email уже создан';
  }
}

module.exports = {
  UniqueError,
};
