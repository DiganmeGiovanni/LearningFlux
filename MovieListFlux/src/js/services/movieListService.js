
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

/******************************************************************************/

var API_URL = ToWatchConstants.API_URL + "movieslists/"

module.exports = {

  addMovieToList: function (postMovie, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "addmovie",
      json: postMovie
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  createList: function(listName, email, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "addlist",
      form: {
        email: email,
        listName: listName
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  deleteList: function (listIdDatastore, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "deletelist",
      form: {
        listIdDatastore: listIdDatastore
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  destroyMovie: function (postMovie, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "removemovie",
      json: postMovie
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  fetchPersonalList: function (email, callback) {

    var params = {
      method: 'GET',
      url: API_URL + "personallist",
      qs: {
        email: email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  fetchList: function (listIdDatastore, callback) {
    var params = {
      method: 'GET',
      url: API_URL + "list",
      qs: {
        idDatastore: listIdDatastore
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  fetchListsWithoutContent: function (email, callback) {
    var params = {
      method: 'GET',
      url: API_URL + "listswithoutcontents",
      qs: {
        email: email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  shareList: function (listIdDatastore, email, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "sharelist",
      form: {
        listIdDatastore: listIdDatastore,
        email: email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  unShareList: function (listIdDatastore, email, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "unsharelist",
      form: {
        listIdDatastore: listIdDatastore,
        email: email
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  updateToWatch: function (postMovie, callback) {
    var params = {
      method: 'POST',
      url: API_URL + "updatemovie",
      json: postMovie
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }
}