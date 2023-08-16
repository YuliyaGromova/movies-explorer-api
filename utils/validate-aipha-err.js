/* eslint-disable no-useless-escape */
const regRU = /^[А-я.0-9\-\_\:\/\?\[\]\@\!\$\'\"\(\)\+\,\;\ =]+/i;
const regEN = /^[A-z.0-9\-\_\:\/\?\[\]\@\!\$\'\"\(\)\+\,\;\ =]+/i;

module.exports = {
  regRU,
  regEN,
};
