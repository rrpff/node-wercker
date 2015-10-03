const API = require('./lib/api');
const Path = require('path');

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
}
