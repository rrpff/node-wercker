const API = require('./lib/api');

class Wercker extends API {
  constructor ({ token } = {}) {
    super();
    this.token = token;
  }

  host (resource) {
    return `https://app.wercker.com/api/v3${resource}`;
  }

  defaults () {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    };
  }

  applications (username) {
    return this.get(`/applications/${username}`);
  }

  application (username, name) {
    return this.get(`/applications/${username}/${name}`);
  }

  builds (username, name) {
    return this.get(`/applications/${username}/${name}/builds`);
  }

  build (id) {
    return this.get(`/builds/${id}`);
  }

  deploys (username, name) {
    return this.get(`/applications/${username}/${name}/deploys`);
  }

  deploy (id) {
    return this.get(`/deploys/${id}`);
  }
}

module.exports = Wercker;
