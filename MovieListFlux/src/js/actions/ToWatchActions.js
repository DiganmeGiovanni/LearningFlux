
var AppDispatcher   = require('../dispatcher/AppDispatcher')
var ToWatchConstans = require('../constants/toWatchConstants')

var ToWatchActions = {

  /**
   * Adds a movie to the backend.
   * @param movie Movie object, please be sure that object
   *              has: [tmdbId, title, trailerId, directors, genres and synopsis]
   *              properties.
   */
  create: function (movie) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_CREATE,
      movie: movie
    })
  },
  
  destroy: function (tmdbId) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_DESTROY,
      tmdbId: tmdbId
    })
  },

  destroyWatched: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_DESTROY_COMPLETED
    })
  },

  fetchToWatchList: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_FETCH_ALL
    })
  },

  toggleWatched: function(toWatch) {
    toWatch.isWatched = (toWatch.isWatched ? false : true)

    AppDispatcher.dispatch({
      actionType: (toWatch.isWatched ? ToWatchConstans.TOWATCH_MARK_AS_SEEN : ToWatchConstans.TOWATCH_MARK_AS_NOTSEEN),
      tmdbId: toWatch.tmdbId
    })
  },

  userLoggin: function (userEmail) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.USER_LOGIN,
      userEmail: userEmail
    })
  },

  userLogout: function() {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.USER_LOGOUT
    })
  }

}

module.exports = ToWatchActions