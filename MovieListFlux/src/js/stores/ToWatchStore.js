
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
var _toWatchs = [
  {
    id: '1',
    isWatched: false,
    title: 'Titanic',
    genre: 'Romantic | Adventure',
    director: 'James Cameron',
    synopsis: 'El RMS Titanic fue un transatlántico británico, el mayor barco del mundo en el momento de su terminación, que se hundió en la noche del 14 al 15 de abril de 1912 durante su viaje inaugural desde Southampton a Nueva York.'
  },
  {
    id: '2',
    isWatched: false,
    title: 'Gladiator',
    genre: 'Adventure',
    director: 'Ridley Scott',
    synopsis: 'Gladiator es una película épica del género péplum estrenada en el año 2000'
  },
  {
    id: '3',
    isWatched: false,
    title: 'The Martian',
    genre: 'Adventure | Fiction',
    director: 'Ridley Scott',
    synopsis: 'The Martian es una película estadounidense de ciencia ficción de 2015 dirigida por Ridley Scott y escrita por Drew Goddard'
  },
  {
    id: '4',
    isWatched: false,
    title: 'Armagedon',
    genre: 'Adventure | Fiction',
    director: 'Michael Bay',
    synopsis: 'Armageddon es una película de ciencia ficción y cine catástrofe de 1998, dirigida por Michael Bay y producida por Jerry Bruckheimer'
  }
]

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