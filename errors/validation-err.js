class ValidationError extends Error {// 400
  constructor(message) {
    super(message);
    this.status = 400;
    this.message = message || 'Вы ввели некоректные данные';
  }
}

module.exports = {
  ValidationError,
};
