const jwt = require('jwt-simple');
const config = require('../helpers/config');

module.exports = async function(req, res, next) {
  let token = (req.body && req.body.access_token) || 
              (req.query && req.query.access_token) || req.headers['access_token'];
  req.user = {"id":9,"name":"Admin"};
  next();
};
