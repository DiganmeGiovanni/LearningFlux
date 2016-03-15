
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

module.exports = {

  testYoutube: function () {

    var params = {
      method: 'GET',
      url: ToWatchConstants.GO_YTB_API_URL_SEARCH,
      qs: {
        part: 'snippet',
        q: 'Batman',
        type: 'video',
        key: ToWatchConstants.GO_YTB_API_KEY
      }
    }

    console.log('To launch request')
    request(params, function (err, res, body) {
      if (err) {
        console.error('Youtube status: ' + res.status)
        console.error(err)
      }

      console.log(body)
    })

  },

  searchTrailers: function (movieTitle, callback) {

    var params = {
      method: 'GET',
      url: ToWatchConstants.GO_YTB_API_URL_SEARCH,
      qs: {
        part: 'snippet',
        q: movieTitle + ' Official Trailer',
        type: 'video',
        key: ToWatchConstants.GO_YTB_API_KEY
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }

}