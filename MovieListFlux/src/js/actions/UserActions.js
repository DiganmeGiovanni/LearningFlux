
var AppDispatcher = require('../dispatcher/AppDispatcher')
var ToWatchConstants = require('../constants/toWatchConstants')

var UserActions = {

  loginUser: function (name, email) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.USER_LOGIN,
      name: name,
      email: email
    })
  },

  logoutUser: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.USER_LOGOUT
    })
  },

  uploadUserPreferences: function () {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.USER_UPLOAD_PREFERENCES
    })
  }

}

module.exports = UserActions