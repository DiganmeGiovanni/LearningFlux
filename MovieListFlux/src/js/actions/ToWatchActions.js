
var AppDispatcher   = require('../dispatcher/AppDispatcher')
var ToWatchConstants = require('../constants/toWatchConstants')

var ToWatchActions = {

  /**
   * Adds a movie to the current list on backend
   */
  addMovieToCurrentList: function (movie) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_ADD_TO_CURR_LIST,
      movie: movie
    })
  },

  createList: function (listName, email) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_CREATE_LIST,
      listName: listName,
      email: email
    })
  },

  deleteCurrList: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_DELETE_CURR_LIST,
    })
  },

  destroy: function (tmdbId) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_DESTROY,
      tmdbId: tmdbId
    })
  },

  destroyWatched: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_DESTROY_COMPLETED
    })
  },

  fetchToWatchList: function (listIdDatastore) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_FETCH_LIST,
      listIdDatastore: listIdDatastore
    })
  },

  fetchListsWithoutContents: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_FETCH_LISTS_WITHOUT_CONTENTS
    })
  },

  shareCurrentList: function(email) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.TOWATCH_SHARE_CURR_LIST,
      email: email
    })
  },

  toggleWatched: function(toWatch) {
    toWatch.isWatched = (toWatch.isWatched ? false : true)

    AppDispatcher.dispatch({
      actionType: (toWatch.isWatched ? ToWatchConstants.TOWATCH_MARK_AS_SEEN : ToWatchConstants.TOWATCH_MARK_AS_NOTSEEN),
      tmdbId: toWatch.tmdbId
    })
  },

}

module.exports = ToWatchActions
