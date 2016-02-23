
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

/*****************************************************************************/

var EVENT_CHANGE = 'event-change'
var _toWatchs = [
  {
    id: '1',
    title: 'Titanic',
    director: 'James Cameron',
    genre: 'Romantic | Adventure',
    trailerUrl: "http://google.com",
    synopsis: 'El RMS Titanic fue un transatlántico británico, el mayor barco del mundo en el momento de su terminación, que se hundió en la noche del 14 al 15 de abril de 1912 durante su viaje inaugural desde Southampton a Nueva York.',
    userEmail: "giovanni.fi05@gmail.com",
    isWatched: false,
    isActive: true
  },
  {
    id: '2',
    title: 'Gladiator',
    director: 'Ridley Scott',
    genre: 'Adventure',
    trailerUrl: "http://google.com",
    synopsis: 'Gladiator es una película épica del género péplum estrenada en el año 2000',
    userEmail: "giovanni.fi05@gmail.com",
    isWatched: false,
    isActive: true
  },
  {
    id: '3',
    title: 'The Martian',
    director: 'Ridley Scott',
    genre: 'Adventure | Fiction',
    trailerUrl: "http://google.com",
    synopsis: 'The Martian es una película estadounidense de ciencia ficción de 2015 dirigida por Ridley Scott y escrita por Drew Goddard',
    userEmail: "giovanni.fi05@gmail.com",
    isWatched: false,
    isActive: true
  },
  {
    id: '4',
    title: 'Armagedon',
    director: 'Michael Bay',
    genre: 'Adventure | Fiction',
    trailerUrl: "http://google.com",
    synopsis: 'Armageddon es una película de ciencia ficción y cine catástrofe de 1998, dirigida por Michael Bay y producida por Jerry Bruckheimer',
    userEmail: "giovanni.fi05@gmail.com",
    isWatched: false,
    isActive: true
  }
]

function createToWatch(title, director, genre, trilerUrl, synopsis) {

  // Random id (TODO Should replace by incoming from web service?)
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
  var toWatchMovie = {
    id: id, // TODO Remove this to auto generate on server
    title: title,
    director: director,
    genre: genre,
    trailerUrl: trilerUrl,
    synopsis: synopsis,
    userEmail: ToWatchConstants.USER_EMAIL,
    isWatched: false,
    isActive: true
  }

  // TODO Send to watch to server before pushing
  _toWatchs.push(toWatchMovie)
}

function updateToWatch(id, updatedToWatch) {
  for(var i=0; i<_toWatchs.length; i++) {
    if(_toWatchs[i].id === id) {

      // TODO, Send update request to server
      _toWatchs[i] = objAssign({}, _toWatchs[i], updatedToWatch)
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

      // TODO Emit change until server creation ends
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_DESTROY:
      destroyToWatch(action.id)

      // TODO Emit change until server updates ends (Or maybe not)
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_DESTROY_COMPLETED:
      destroyWatchedToWatchs()

      // TODO Emit change until server updates ends (Or maybe not)
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_SEEN:
      updateToWatch(action.id, {isWatched: true})

      // TODO Emit change until server updates ends (Or maybe not)
      ToWatchStore.emitChange()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_NOTSEEN:
      updateToWatch(action.id, {isWatched: false})

      // TODO Emit change until server updates ends (Or maybe not)
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

      // TODO Emit change until server updates ends (Or maybe not)
      ToWatchStore.emitChange()
      break

      default:
        // Do nothing

  }
})

module.exports = ToWatchStore