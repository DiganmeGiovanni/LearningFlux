
/**
 * To Watch store
 *
 */

var AppDispatcher    = require('../dispatcher/AppDispatcher')
var EventEmitter     = require('events').EventEmitter
var objAssign        = require('object-assign')
var alertify         = require('alertify.js')()

var ToWatchConstants = require('../constants/toWatchConstants')
var movieListService = require('../services/movieListService')

/*****************************************************************************/

var EVENT_CHANGE = 'event-change'
var listsWithoutContent = []
var currentList = {
  idDatastore: 0,
  isPersonalList: true,
  ownerEmail: '',
  movies: [],
  sharedWith: []
}

// Alertify setup
alertify.theme('bootstrap')
alertify.logPosition("bottom right")


var ToWatchStore = objAssign({}, EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback)
  },

  areCurrentListAllWatched: function() {
    var allComplete = true;
    var movies = currentList.movies

    for(var i=0; i<movies.length; i++) {
      if(!movies[i].isWatched) {
        allComplete = false
      }
    }

    return allComplete
  },

  createList: function (listName, email) {
    var self = this
    movieListService.createList(listName, email, function (err, body) {
      if (err) {
        console.error("Fatal error creating list")
        console.error(err)
      }
      else {
        body = JSON.parse(body)
        self.fetchList(body.idDatastore)
      }
    })
  },

  /**
   * Adds a movie to the current list on backend
   * @param movie Movie object, please be sure that object
   * contains fields: [tmdbId, title, trailerId, directors, genres and synopsis]
   */
  createToWatch: function (movie) {
    var self = this

    var postMovie = {
      listIdDatastore: currentList.idDatastore,
      movie: {
        tmdbId: movie.tmdbId,
        title: movie.title,
        directors: movie.directors,
        genres: movie.genres,
        trailerId: movie.trailerId,
        synopsis: movie.synopsis,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate,
        voteAverage: movie.voteAverage,
        addedByEmail: ToWatchConstants.userData.email,
        addedByName: ToWatchConstants.userData.name,
        isWatched: false,
        isActive: true
      }
    }

    movieListService.addMovieToList(postMovie, function (err, addedMovie) {
      if (err) {
        console.error("Error adding movie to list on backend")
        console.error(err)
      }
      else {
        currentList.movies.push(addedMovie)
        self.emitChange()
      }
    })
  },

  deleteCurrList: function () {
    var self = this

    if (currentList.isPersonalList) {
      var alertMsg = '<b class="alert alert-danger">IT\'S YOUR LIST!</b><br/><br/>'
      alertMsg += 'The personal list can not be removed.'

      alertify
        .okBtn('Ok')
        .alert(alertMsg)
    }
    else if (currentList.ownerEmail !== ToWatchConstants.userData.email) {
      var confirmMsg = '<b class="alert alert-danger">LEAVE LIST INSTEAD?</b><br/><br/>'
      confirmMsg += 'Only the list\'s creator can delete it.<br/>'
      confirmMsg += 'Do you want to leave the list instead?'

      var okBtnFN = function (ev) {
        var idDS = currentList.idDatastore
        var email = ToWatchConstants.userData.email
        movieListService.unShareList(idDS, email, function (err, body) {
          if (err) {
            console.error("Error unsharing list")
            console.error(err)

            alertify.error('You can not be removed from list')
          }
          else {
            alertify.log('You have been removed from the list!')
            self.fetchPersonalList()
          }
        })
      }
      
      alertify
        .okBtn('Leave list')
        .confirm(confirmMsg, okBtnFN)
    }
    else {
      var confirmMsg = '<b class="alert alert-danger">THIS CAN\'T BE UNDONE!</b><br/><br/>'
      confirmMsg += 'Are you sure you wish delete current list and all its contents?'
      var okBtnFN = function () {
        var idDS = currentList.idDatastore
        movieListService.deleteList(idDS, function (err, body) {
          if (err) {
            console.error("Error deleting list")
            console.error(err)

            alertify.error('The list can not be deleted!')
          }
          else {
            alertify.log('Your list has been deleted!')
            self.fetchPersonalList()
          }
        })
      }

      alertify
        .okBtn('Delete list')
        .confirm(confirmMsg, okBtnFN)
    }
  },

  destroyToWatch: function (tmdbId) {
    var self = this

    for(var i=0; i<currentList.movies.length; i++) {
      if(currentList.movies[i].tmdbId === tmdbId) {

        var postMovie = {
          listIdDatastore: currentList.idDatastore,
          movie: currentList.movies[i]
        }

        movieListService.destroyMovie(postMovie, function (err, body) {
          if (err) {
            console.error('Fatal error while destroying movie on backend')
            console.error(err)
          }
          else {
            currentList.movies.splice(i, 1)
            self.emitChange()
          }
        })
        break
      }
    }
  },

  destroyWatchedToWatches: function () {
    var self = this

    for(var i=0; i<currentList.movies.length; i++) {
      if(currentList.movies[i].isWatched) {
        self.destroyToWatch(currentList.movies[i].tmdbId)
      }
    }
  },

  emitChange: function() {
    this.emit(EVENT_CHANGE)
  },

  fetchPersonalList: function () {
    var email = ToWatchConstants.userData.email
    if (email && email.length > 0) {
      var self = this

      movieListService.fetchPersonalList(email, function(err, body) {
        if (err) {
          console.error("Fatal while fetching personal list for: " + email)
          console.error(err)
        }
        else {
          body = JSON.parse(body)
          currentList = body

          self.emitChange()
        }
      })
    }
    else {
      console.error("User is not logged in")
    }
  },

  fetchList: function (listIdDatastore) {
    var email = ToWatchConstants.userData.email
    if (email && email.length > 0) {
      var self = this

      movieListService.fetchList(listIdDatastore, function(err, body) {
        if (err) {
          console.error("Fatal while fetching list for: " + email)
          console.error(err)
        }
        else {
          body = JSON.parse(body)
          currentList = body

          self.emitChange()
        }
      })
    }
    else {
      console.error("User is not logged in")
    }
  },

  fetchListsWithoutContents: function () {
    var email = ToWatchConstants.userData.email
    if (email && email.length > 0) {
      var self = this

      movieListService.fetchListsWithoutContent(email, function(err, body) {
        if (err) {
          console.error("Fatal while fetching lists for: " + email)
          console.error(err)
        }
        else {
          body = JSON.parse(body)
          listsWithoutContent = body

          self.emitChange()
        }
      })
    }
    else {
      console.error("User is not logged in")
    }
  },

  getCurrentList: function () {
    return currentList
  },

  getListsWithoutContents: function () {
    return listsWithoutContent
  },

  removeChangeListener: function(callback) {
    this.removeListener(callback)
  },

  shareCurrentList: function (email) {
    var self = this
    var yetShared = false
    for(var i=0; i< currentList.sharedWith.length; i++) {
      if (currentList.sharedWith[i] === email) {
        yetShared = true
        break
      }
    }

    if(!yetShared) {
      movieListService.shareList(currentList.idDatastore, email, function (err, body) {
        if (err) {
          console.error("Fatal error sharing list")
          console.error(err)
        }
        else {
          body = JSON.parse(body)
          currentList = body

          self.emitChange()
        }
      })
    }
  },

  updateToWatch: function (tmdbId, updatedToWatch) {
    var self = this

    for(var i=0; i< currentList.movies.length; i++) {
      if(currentList.movies[i].tmdbId === tmdbId) {

        var nonUpdatedToWatch = currentList.movies[i]
        currentList.movies[i] = objAssign({}, currentList.movies[i], updatedToWatch)
        self.emitChange()

        // Send update request to backend
        var postMovie = {
          listIdDatastore: currentList.idDatastore,
          movie: currentList.movies[i]
        }

        movieListService.updateToWatch(postMovie, function (err, body) {
          if (err) {
            console.error("Error updating to watch")
            console.error(err)

            currentList.movies[i] = nonUpdatedToWatch
            self.emitChange()
          }
          else {
            self.emitChange()
          }
        })

        break
      }
    }
  },

})

AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case ToWatchConstants.TOWATCH_FETCH_LIST:
      ToWatchStore.fetchList(action.listIdDatastore)
      break

    case ToWatchConstants.TOWATCH_FETCH_LISTS_WITHOUT_CONTENTS:
      ToWatchStore.fetchListsWithoutContents()
      break

    case ToWatchConstants.TOWATCH_ADD_TO_CURR_LIST:
      ToWatchStore.createToWatch(action.movie)
      break

    case ToWatchConstants.TOWATCH_CREATE_LIST:
      ToWatchStore.createList(action.listName, action.email)
      break

    case ToWatchConstants.TOWATCH_DELETE_CURR_LIST:
      ToWatchStore.deleteCurrList()
      break

    case ToWatchConstants.TOWATCH_DESTROY:
      ToWatchStore.destroyToWatch(action.tmdbId)
      break

    case ToWatchConstants.TOWATCH_DESTROY_COMPLETED:
      ToWatchStore.destroyWatchedToWatches()
      break

    case ToWatchConstants.TOWATCH_MARK_AS_SEEN:
      ToWatchStore.updateToWatch(action.tmdbId, {isWatched: true})
      break

    case ToWatchConstants.TOWATCH_MARK_AS_NOTSEEN:
      ToWatchStore.updateToWatch(action.tmdbId, {isWatched: false})
      break

    case ToWatchConstants.TOWATCH_SHARE_CURR_LIST:
      ToWatchStore.shareCurrentList(action.email)
      break


    case ToWatchConstants.TOWATCH_UPDATE:
      break

    default:
      // Do nothing

  }
})

module.exports = ToWatchStore
