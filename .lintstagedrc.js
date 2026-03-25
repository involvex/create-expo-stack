/**
 * @type {import("lint-staged").Config}
 */
module.exports = {
  '!bun.lock': 'bun run prettier --write'
};
