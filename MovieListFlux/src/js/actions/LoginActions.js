
var AppDispatcher = require('../dispatcher/AppDispatcher')
var ToWatchConstants = require('../constants/toWatchConstants')

var LoginActions = {

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
  }

}

module.exports = LoginActions