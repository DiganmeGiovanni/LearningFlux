
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var ToWatchStore     = require('./ToWatchStore')
var ToWatchConstants = require('../constants/toWatchConstants')

var youtubeService = require('../services/youtubeService')

var EVENT_CHANGE = 'event-change-login'

var LoginStore = objectAssign({}, EventEmitter.prototype, {

  isUserLogged: function () {
    return (ToWatchConstants.user_data.email &&
        ToWatchConstants.user_data.email.length > 0)
  },

  loginUser: function (firstName, lastName, email) {
    ToWatchConstants.user_data.firstName = firstName
    ToWatchConstants.user_data.lastName  = lastName
    ToWatchConstants.user_data.email     = email

    this.emitChange()
    ToWatchStore.getAllFromBackend()
  },

  logoutUser: function () {
    ToWatchConstants.user_data = {}
    this.emitChange()
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

    case ToWatchConstants.USER_LOGIN:
      var firstName = action.firstName
      var lastName  = action.lastName
      var email     = action.email
      LoginStore.loginUser(firstName, lastName, email)
      break

    case ToWatchConstants.USER_LOGOUT:
      LoginStore.logoutUser()
      break

    default:
      // Do nothing
  }
})

module.exports = LoginStore