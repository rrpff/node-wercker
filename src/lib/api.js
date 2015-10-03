const request = require('request');

class API {
  static request (method, options = {}) {
    options.method = method;

    return new Promise(function (accept, reject) {
      request(options, function (err, response, body) {
        if (err || response.statusCode < 200 || response.statusCode > 299) {
          reject(err);
        } else {
          try {
            accept(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  }

  defaults () {
    return {};
  }

  host (resource) {
    return resource;
  }

  request (method, resource, options = {}) {
    let requestOptions = Object.assign({}, this.defaults(), options);
    requestOptions.uri = this.host(resource);

    return this.constructor.request(method, requestOptions);
  }
}

['get', 'put', 'post', 'patch', 'delete'].forEach(method => {
  API.prototype[method] = function () {
    return this.request(method, ...arguments);
  };
});

module.exports = API;
