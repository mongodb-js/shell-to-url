# mongodb-shell-to-url [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url]

Converts a shell connection string (from Atlas) to a MongoDB URL.

## Example

```javascript

var shellToUrl = require('mongodb-shell-to-url');
var connectionString = 'mongo "mongodb://localhost:27017?replicaSet=MyCluster" --ssl --username hans';

console.log(shellToUrl(connectionString));
// logs "mongodb://hans:PASSWORD@localhost:27017?ssl=true&replicaSet=MyCluster&authSource=admin"
```

## Known Limitations

- [ ] requires a MongoDB URI in double-quotes
- [ ] does not support `--hostname`, `--port` yet
- [ ] ignores password and hard-codes to `PASSWORD` for security reasons
- [ ] only works if the original MongoDB URL contains a `?`, sorry :-)

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/shell-to-url.svg
[travis_url]: https://travis-ci.org/mongodb-js/shell-to-url
[npm_img]: https://img.shields.io/npm/v/mongodb-shell-to-url.svg
[npm_url]: https://npmjs.org/package/mongodb-shell-to-url
