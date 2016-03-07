
var AppDispatcher = require('../dispatcher/AppDispatcher')
var ToWatchConstants = require('../constants/toWatchConstants')

var LoginActions = {

  loginUser: function (firstName, lastName, email) {
    AppDispatcher.dispatch({
      actionType: ToWatchConstants.USER_LOGIN,
      firstName: firstName,
      lastName: lastName,
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