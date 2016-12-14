var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

module.exports = function(host, user, pass) {
  this.auth = {user: user, pass: pass};
  this.url = 'https://' + host + ':17778/SolarWinds/InformationService/v3/Json/'

  this.query = function(query, params, cb) {
    this._req('POST', 'Query', {query: query, parameters: params}, cb);
  };

  this.invoke = function(entity, verb, args, cb) {
    this._req('POST', 'Invoke/' + entity + '/' + verb, args, cb);
  };

  this.create = function(entity, props, cb) {
    this._req('POST', 'Create/' + entity, props, cb);
  };

  this.read = function(uri, cb) {
    this._req('GET', uri, null, cb);
  };

  this.update = function(uri, props, cb) {
    this._req('POST', uri, props, cb);
  };

  this.delete = function(uri, cb) {
    this._req('DELETE', uri, null, cb);
  };

  this._req = function(method, frag, data, cb) {
    request(
    {
      url: this.url + frag,
      method: method,
      json: true,
      headers: {'Content-Type': 'application/json'},
      auth: this.auth,
      body: data
    },
    function (err, res, body) {
      if (!err) {
        cb(null, body);
      }
      else {
        cb(err);
      }
    });
  };
};