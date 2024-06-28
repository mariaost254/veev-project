class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.status = 404;
    }
  }

  class NotAuthenticated extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotAuthenticated';
      this.status = 401;
    }
  }
  
  module.exports = {
    NotFoundError, NotAuthenticated
  };