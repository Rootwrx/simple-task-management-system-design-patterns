/*
 file role : storing  important global constant variables
*/

export const TIMEOUT_SEC = 10;

Array.prototype.markup = function (callback) {
  return this.forEach(callback).join("");
};
