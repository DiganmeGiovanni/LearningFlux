
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

/******************************************************************************/

var API_URL = ToWatchConstants.API_URL

module.exports = {

  loginUser: function (name, email, callback) {

    var params = {
      method: 'GET',
      url: API_URL + "users/login",
      qs: {
        name: name,
        email: email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }

}