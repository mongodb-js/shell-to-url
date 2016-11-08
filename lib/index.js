/**
 * Parses a shell connection string (e.g. as returned by the Atlas
 * UI) and turns it into a proper MongoDB URL.
 *
 * @param {String} shellStr   connection string to convert.
 * @return {String|null}      MongoDB URL if successful, or else null.
 *
 * @see https://github.com/mongodb-js/url
 * @api public
 */
function parse(shellStr) {
  // make sure it starts with "mongo "
  if (!shellStr.match('^mongo ')) {
    return null;
  }

  // extract mongodb URL
  var url = shellStr.match(/"(mongodb:\/\/[^"]+)"/);
  if (!url) {
    return null;
  }
  url = url[1];

  // extract username and insert into URL
  var username = shellStr.match(/--username\s+(\w+)/);
  if (username) {
    username = username[1];
    url = url.replace('mongodb://', 'mongodb://' + username + ':PASSWORD@');
    // insert username into url
  }

  // extract --ssl
  var ssl = shellStr.match(/\s+--ssl(\s+|$)/);
  if (ssl) {
    url = url.replace('?', '?ssl=true&');
  }

  // extract --authenticationDatabase
  var authDB = shellStr.match(/\s+--authenticationDatabase\s+(\w+)/);
  if (authDB) {
    authDB = authDB[1];
  } else {
    authDB = 'admin';
  }
  url += '&authSource=' + authDB;

  return url;
}

module.exports = parse;
