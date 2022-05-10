/// <reference path="../index.d.ts" />

/**
 * Returns your Onetap username.
 * @returns {string} Your username
 */
function user(): string {
  return Cheat.GetUsername();
}

export default {
  user,
};
