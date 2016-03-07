
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

var API_URL = ToWatchConstants.API_URL

module.exports = {

  fetchAllMovies: function(callback) {

    var params = {
      method: 'GET',
      url: API_URL + "allusermovies",
      qs: {
        userEmail: ToWatchConstants.user_data.email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  postToWatch: function (toWatch, callback) {

    var params = {
      method: 'POST',
      url: API_URL + "addmovie",
      json: toWatch
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  putToWatch: function(toWatch, callback) {

    var params = {
      method: 'POST',
      url: API_URL + "updatemovie",
      json: toWatch
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }
}