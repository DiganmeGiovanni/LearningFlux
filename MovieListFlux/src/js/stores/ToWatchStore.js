
/**
 * To Watch store
 *
 * Each to watch has this structure;
 * {
 *    "id":       4785074604081152,
 *    "title":    "Titanic edited",
 *    "director": "Some one",
 *    "genre":    "Genre of movie",
 *    "trailerUrl": "trailer url",
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

function createToWatch(title, director, genre, trilerUrl, synopsis) {

  var toWatchMovie = {
    title: title,
    director: director,
    genre: genre,
    trailerUrl: trilerUrl,
    synopsis: synopsis,
    userEmail: ToWatchConstants.USER_EMAIL,
    isWatched: false,
    isActive: true
  }

  movieService.postToWatch(toWatchMovie, function (err, toWatch) {
    if (err) {
      // TODO Log error
    }
    else {
      _toWatchs.push(toWatch)
      ToWatchStore.emitChange()
    }
  })
}

function updateToWatch(id, updatedToWatch) {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].id === id) {

      // Display update on client immediatelly and after send ajax request
      _toWatchs[i] = objAssign({}, _toWatchs[i], updatedToWatch)

      // Send update request to backend
      movieService.putToWatch(_toWatchs[i], function (err, body) {
        if(err) {
          // TODO Log error and Restore previous towatch state
          ToWatchStore.emitChange()
        }
      })
    }
  }
}

function destroyToWatch(id) {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].id === id) {

      _toWatchs[i].isActive = false
      updateToWatch(id, _toWatchs[i])
      break
    }
  }
}

function destroyWatchedToWatchs() {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].isWatched) {
      destroyToWatch(_toWatchs[i].id)
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
    console.log("Requesting all from backend with changes")
    var self = this
    movieService.fetchAllMovies(function(err, remoteToWatches) {
      if(err) {
        // TODO Log error here
        console.error(err)
      }
      else {
        remoteToWatches = JSON.parse(remoteToWatches)
        for(var i=0; i<remoteToWatches.length; i++) {
          console.log("Movie received: " + remoteToWatches[i].title)
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
      var title = action.title
      var director = action.director
      var genre = action.genre
      var trailerUrl = action.trailerUrl
      var synopsis = action.synopsis

      createToWatch(title, director, genre, trailerUrl, synopsis)
      break

    case ToWatchConstants.TOWATCH_DESTROY:
      destroyToWatch(action.id)
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_DESTROY_COMPLETED:
      destroyWatchedToWatchs()
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_SEEN:
      updateToWatch(action.id, {isWatched: true})
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_NOTSEEN:
      updateToWatch(action.id, {isWatched: false})
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_UPDATE:
      var updatedToWatch = {}
      if (action.title && action.title.trim() > 0) {
        updatedToWatch.title = action.title
      }
      if (action.director && action.director.trim() > 0) {
        updatedToWatch.director = action.director
      }
      if (action.genre && action.genre.trim() > 0) {
        updatedToWatch.genre = action.genre
      }
      if (action.trailerUrl && action.trailerUrl.trim() > 0) {
        updatedToWatch.trailerUrl = action.trailerUrl
      }
      if (action.synopsis && action.synopsis.trim() > 0) {
        updatedToWatch.synopsis = action.synopsis
      }

      updateToWatch(action.id, updatedToWatch)
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.API_FETCH_ALL:
      console.log("Dispatch received")
      ToWatchStore.getAllFromBackend()
      break

    default:
      // Do nothing

  }
})

module.exports = ToWatchStore