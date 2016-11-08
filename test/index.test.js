var shellToUrl = require('../');
var expect = require('chai').expect;

var atlasFixtureShell = 'mongo "mongodb://cluster0-shard-00-00-4qowg.mongodb.net:27017,cluster0-shard-00-01-4qowg.mongodb.net:27017,cluster0-shard-00-02-4qowg.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0" --ssl --username admin --password';

var atlasFixtureUrl = 'mongodb://admin:PASSWORD@cluster0-shard-00-00-4qowg.mongodb.net:27017,cluster0-shard-00-01-4qowg.mongodb.net:27017,cluster0-shard-00-02-4qowg.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

describe('mongodb-shell-to-url', function() {
  it('works on an Atlas example', function() {
    var url = shellToUrl(atlasFixtureShell);
    expect(url).to.be.equal(atlasFixtureUrl);
  });

  it('returns null if the input cannot be parsed', function() {
    var url = shellToUrl('I am clearly not a mongo shell string.');
    expect(url).to.be.null; // eslint-disable-line no-unused-expressions
  });

  it('omits ssl=true if no --ssl is present', function() {
    var noSSLFixture = 'mongo "mongodb://cluster0-shard-00-00-4qowg.mongodb.net:27017,cluster0-shard-00-01-4qowg.mongodb.net:27017,cluster0-shard-00-02-4qowg.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0" --username admin --password';
    var url = shellToUrl(noSSLFixture);
    expect(url).to.not.contain('ssl=true');
  });

  it('leaves out username if no --username is present', function() {
    var noUsernameFixture = 'mongo "mongodb://cluster0-shard-00-00-4qowg.mongodb.net:27017,cluster0-shard-00-01-4qowg.mongodb.net:27017,cluster0-shard-00-02-4qowg.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0" --ssl';
    var url = shellToUrl(noUsernameFixture);
    expect(url).to.contain('mongodb://cluster');
  });

  it('understands auth sources different to `admin`', function() {
    var nonDefaultAuthSourceFixture = 'mongo "mongodb://cluster0-shard-00-00-4qowg.mongodb.net:27017,cluster0-shard-00-01-4qowg.mongodb.net:27017,cluster0-shard-00-02-4qowg.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0" --ssl --username admin --password --authenticationDatabase test';
    var url = shellToUrl(nonDefaultAuthSourceFixture);
    expect(url).to.contain('&authSource=test');
  });
});
