
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

/******************************************************************************/

var API_URL = ToWatchConstants.API_URL + "users/"

module.exports = {

  loginUser: function (name, email, callback) {

    var params = {
      method: 'GET',
      url: API_URL + "login",
      qs: {
        name: name,
        email: email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  uploadUserPreferences: function (callback) {
    var params = {
      method: 'POST',
      url: API_URL + "updatepreferences",
      form: {
        email: ToWatchConstants.userData.email,
        notifyOnListAddition: ToWatchConstants.userData.preferences.notifyOnListAddition,
        notifyOnListMovieAddition: ToWatchConstants.userData.preferences.notifyOnListMovieAddition,
        theme: ToWatchConstants.userData.preferences.theme
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }

}