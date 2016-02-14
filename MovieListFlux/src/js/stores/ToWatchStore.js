
/**
 * To Watch store
 *
 * Each to watch has this structure;
 * {
 *    id: "Unique string id",
 *    isSeen: [true | false],
 *    title: "Title os movie to wath",
 *    genre: "Genre of movie to watch",
 *    director: "Director of movie",
 *    synopsis: "Synopsis of the movie",
 * }
 */

var AppDispatcher    = require('../dispatcher/AppDispatcher')
var EventEmmiter     = require('events').EventEmitter
var ToWatchConstants = require('../constants/toWatchConstants')
var objAssign        = require('object-assign')

/*****************************************************************************/

var EVENT_CHANGE = 'event-change'
var _toWatchs = []

function createToWatch(title, genre, director, synopsis) {

  // Random id
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)

  _toWatchs.push({
    id: id,
    isWatched: false,
    title: title,
    genre: genre,
    director: director,
    synopsis: synopsis
  })
}

function updateToWatch(id, updatedToWatch) {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].id === id) {
      _toWatchs[i] = objAssign({}, _toWatchs[i], updatedToWatch)
    }
  }
}

function destroyToWatch(id) {
  var index = -1
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].id === id) {
      index = i
      break
    }
  }

  if (index > -1) {
    _toWatchs.splice(index, 1)
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
      if(!_toWatchs[i].isSeen) {
        allComplete = false
      }
    }

    return allComplete
  },

  getAll: function() {
    return _toWatchs
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
      var genre = action.genre
      var director = action.director
      var synopsis = action.synopsis

      createToWatch(title, genre, director, synopsis)
      ToWatchStore.emitChange()
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
      if (action.genre && action.genre.trim() > 0) {
        updatedToWatch.genre = action.genre
      }
      if (action.director && action.director.trim() > 0) {
        updatedToWatch.director = action.director
      }
      if (action.synopsis && action.synopsis.trim() > 0) {
        updatedToWatch.synopsis = action.synopsis
      }

      updateToWatch(action.id, updatedToWatch)
      ToWatchStore.emitChange()
      break

      default:
        // Do nothing

  }
})

module.exports = ToWatchStore