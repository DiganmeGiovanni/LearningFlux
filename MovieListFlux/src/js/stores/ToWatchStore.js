
/**
 * To Watch store
 *
 * Each to watch has this structure;
 * {
 *    "tmdbId":   4785074604081152,
 *    "title":    "Titanic edited",
 *    "directors": [],
 *    "genres":    [],
 *    "trailerId": "Youtube video id",
 *    "synopsis":   "Synopsis redaction",
 *    "userEmail":  "giovanni.fi05@gmail.com",
 *    "isWatched":  false,
 *    "isActive":   true
 * }
 */

var AppDispatcher    = require('../dispatcher/AppDispatcher')
var EventEmmiter     = require('events').EventEmitter
var ToWatchConstants = require('../constants/toWatchConstants')
var objAssign        = require('object-assign')

var movieService = require('../services/movieService')

/*****************************************************************************/

var EVENT_CHANGE = 'event-change'
var _toWatchs = []

/**
 * Adds a movie to the backend.
 * @param movie Movie object, please be sure that object
 *              has: [tmdbId, title, trailerId, directors, genres and synopsis]
 *              properties.
 */
function createToWatch(movie) {

  var toWatchMovie = {
    tmdbId: movie.tmdbId,
    title: movie.title,
    directors: movie.directors,
    genres: movie.genres,
    trailerId: movie.trailerId,
    synopsis: movie.synopsis,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
    voteAverage: movie.voteAverage,
    userEmail: ToWatchConstants.user_data.email,
    isWatched: false,
    isActive: true
  }

  movieService.postToWatch(toWatchMovie, function (err, toWatch) {
    if (err) {
      console.error("Error creating movie on backend")
      console.error(err)
    }
    else {
      _toWatchs.push(toWatch)
      ToWatchStore.emitChange()
    }
  })
}

function updateToWatch(tmdbId, updatedToWatch) {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].tmdbId === tmdbId) {

      var nonUpdatedToWatch = _toWatchs[i]
      _toWatchs[i] = objAssign({}, _toWatchs[i], updatedToWatch)

      movieService.putToWatch(_toWatchs[i], function (err, body) {
        if(err) {
          console.error("Error updating to watch")
          console.error(err)

          _toWatchs[i] = nonUpdatedToWatch
        }
        else {
          ToWatchStore.emitChange()
        }
      })
    }
  }
}

function destroyToWatch(tmdbId) {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].tmdbId === tmdbId) {

      _toWatchs[i].isActive = false
      updateToWatch(tmdbId, _toWatchs[i])
      break
    }
  }
}

function destroyWatchedToWatchs() {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].isWatched) {
      destroyToWatch(_toWatchs[i].tmdbId)
    }
  }
}

var ToWatchStore = objAssign({}, EventEmmiter.prototype, {

  areAllWatched: function() {
    var allComplete = true;

    for(var i=0; i<_toWatchs.length; i++) {
      if(!_toWatchs[i].isWatched) {
        allComplete = false
      }
    }

    return allComplete
  },

  getAll: function() {
    return _toWatchs
  },

  getAllFromBackend: function() {
    var self = this
    movieService.fetchAllMovies(function(err, remoteToWatches) {
      if(err) {
        console.error("Error fetching movies from backend")
        console.error(err)
      }
      else {
        remoteToWatches = JSON.parse(remoteToWatches)
        for(var i=0; i<remoteToWatches.length; i++) {
          _toWatchs.push(remoteToWatches[i])
        }

        self.emitChange()
      }
    })
  },

  emitChange: function() {
    this.emit(EVENT_CHANGE)
  },

  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(callback)
  }

})

AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case ToWatchConstants.TOWATCH_CREATE:
      createToWatch(action.movie)
      break

    case ToWatchConstants.TOWATCH_DESTROY:
      destroyToWatch(action.tmdbId)
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_DESTROY_COMPLETED:
      destroyWatchedToWatchs()
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_SEEN:
      updateToWatch(action.tmdbId, {isWatched: true})
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_NOTSEEN:
      updateToWatch(action.tmdbId, {isWatched: false})
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_UPDATE:
      break

    case ToWatchConstants.TOWATCH_FETCH_ALL:
      ToWatchStore.getAllFromBackend()
      break

    default:
      // Do nothing

  }
})

module.exports = ToWatchStore