/* eslint-disable no-useless-escape */
const regURL = /https?:\/\/(www\.)?([A-z0-9-]{2,63}\.)+[A-z0-9]{1,6}[A-z.\/0-9\-\_\~\:\/\?\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#?/i;

module.exports = {
  regURL,
};
