
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

var tmdbService = {

  fetchMovieDetails: function (movieId, callback) {
    var params = {
      method: 'GET',
      url: ToWatchConstants.TMDB_API_MOVIE_DETAILS + movieId,
      qs: {
        api_key: ToWatchConstants.TMDB_API_KEY,
        append_to_response: 'credits'
      }
    }

    request(params, function (err, resp, body) {
      callback(err, body)
    })
  },

  searchMovie: function (qryTerm, callback) {

    var params = {
      method: 'GET',
      url: ToWatchConstants.TMDB_API_SEARCH_MOVIE,
      qs: {
        api_key: ToWatchConstants.TMDB_API_KEY,
        query: qryTerm
      }
    }

    request(params, function (err, resp, body) {
      callback(err, body)
    })
  }

}

module.exports = tmdbService