
var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var objectAssign  = require('object-assign')

var ToWatchStore     = require('./ToWatchStore')
var ToWatchConstants = require('../constants/toWatchConstants')
var userService      = require('../services/userService')
var EVENT_CHANGE     = 'event-change-login'


/******************************************************************************/

var UserStore = objectAssign({}, EventEmitter.prototype, {

  isUserLogged: function () {
    return (ToWatchConstants.userData.email &&
        ToWatchConstants.userData.email.length > 0)
  },

  loginUser: function (name, email) {
    var self = this

    userService.loginUser(name, email, function (err, body) {
      if(err) {
        console.error("Error login user on backend (" + email + ")")
        console.error(err)
      }
      else {
        body = JSON.parse(body)
        ToWatchConstants.userData = body
        self.emitChange()

        // Retrieve user personal list from backend
        ToWatchStore.fetchPersonalList()
      }
    })
  },

  logoutUser: function () {
    ToWatchConstants.userData = {}
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
  },

  uploadUserPreferences: function () {
    var self = this

    userService.uploadUserPreferences(function (err, body) {
      if (err) {
        console.error("Error updating user preferences")
        console.error(err)
      }
      else {
        body = JSON.parse(body)
        ToWatchConstants.userData = body

        self.emitChange()
      }
    })
  }

})

AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case ToWatchConstants.USER_LOGIN:
      var name  = action.name
      var email = action.email
      UserStore.loginUser(name, email)
      break

    case ToWatchConstants.USER_LOGOUT:
      UserStore.logoutUser()
      break

    case ToWatchConstants.USER_UPLOAD_PREFERENCES:
      UserStore.uploadUserPreferences()
      break

    default:
      // Do nothing
  }
})

module.exports = UserStore