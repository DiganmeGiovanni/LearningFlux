
var AppDispatcher   = require('../dispatcher/AppDispatcher')
var ToWatchConstans = require('../constants/toWatchConstants')

var ToWatchActions = {

  create: function (title, director, genre, trailerUrl, synopsis) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_CREATE,
      title: title,
      director: director,
      genre: genre,
      trailerUrl: trailerUrl,
      synopsis: synopsis
    })
  },
  
  destroy: function (id) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_DESTROY,
      id: id
    })
  },

  destroyWatched: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstans.TOWATCH_DESTROY_COMPLETED
    })
  },

  toggleWatched: function(toWatch) {
    toWatch.isWatched = (toWatch.isWatched ? false : true)

    AppDispatcher.dispatch({
      actionType: (toWatch.isWatched ? ToWatchConstans.TOWATCH_MARK_AS_SEEN : ToWatchConstans.TOWATCH_MARK_AS_NOTSEEN),
      id: toWatch.id
    })
  },

}

module.exports = ToWatchActions