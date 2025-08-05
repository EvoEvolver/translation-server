const config = require('config');

module.exports = async (ctx, next) => {
  const headersSet = {};

  function set(key, value) {
    ctx.set(key, value);
    headersSet[key] = value;
  }

  // Always allow any origin
  set("Access-Control-Allow-Origin", "*");
  set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  set("Access-Control-Allow-Headers", "Content-Type");
  set("Access-Control-Expose-Headers", "Link");

  // Optionally respond to OPTIONS preflight
  if (ctx.method === "OPTIONS") {
    ctx.status = 200;
    ctx.body = '';
    return;
  }

  try {
    await next();
  } catch (e) {
    e.headers = Object.assign({}, e.headers, headersSet);
    throw e;
  }
};
