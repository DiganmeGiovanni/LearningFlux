
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')
var ToWatchConstants = require('../constants/toWatchConstants')
var UserActions = require('../actions/UserActions')

/******************************************************************************/

var EditPreferences = React.createClass({

  componentDidMount() {
    this._takeValuesFromUserData()
  },

  render() {
    return(
      <div className="modal fade" id="preferences-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Preferences</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <b>Theme</b>
                  <select id="theme-chooser" className="form-control" onChange={this._themeChanged}>
                    <option value="blue-dark">Blue dark</option>
                    <option value="pink-dark">Pink dark</option>
                    <option value="gradient-blue-dark">Gradient Blue</option>
                    <option value="gradient-pink-dark">Gradient Pink</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><br/>
                  <b>Email Notifications</b>
                </div>
                <div className="col-xs-12">
                  <span><input id="cb-list-shared" type="checkbox" value=""/>&nbsp;&nbsp;List shared with me</span>
                </div>
                <div className="col-xs-12">
                  <span><input id="cb-movie-added" type="checkbox" value=""/>&nbsp;&nbsp;Movie added to your lists</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={this._resetForm}>
                <span className="glyphicon glyphicon-remove-circle"></span>
                <span>&nbsp;&nbsp;Cancel</span>
              </button>
              <button
                className="btn btn-success"
                onClick={this._savePreferences}>
                <span className="glyphicon glyphicon-cloud-upload"></span>
                <span>&nbsp;&nbsp;&nbsp;Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },

  _resetForm() {
    this._takeValuesFromUserData()

    // Reset to selected theme
    switch (ToWatchConstants.userData.preferences.theme) {
      case 'blue-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/blue-dark.css?r=' + Math.random())
        break
      case 'pink-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/pink-dark.css?r=' + Math.random())
        break
      case 'gradient-blue-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-blue-dark.css?r=' + Math.random())
        break
      case 'gradient-pink-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-pink-dark.css?r=' + Math.random())
        break
    }

    $('#preferences-modal').modal('hide')
  },

  _savePreferences() {
    var notifyOnListShared = document.getElementById('cb-list-shared').checked
    var notifyOnMovieAdded = document.getElementById('cb-movie-added').checked
    var theme = document.getElementById('theme-chooser').value

    ToWatchConstants.userData.preferences.notifyOnListAddition = notifyOnListShared
    ToWatchConstants.userData.preferences.notifyOnListMovieAddition = notifyOnMovieAdded
    ToWatchConstants.userData.preferences.theme = theme

    UserActions.uploadUserPreferences()
    $('#preferences-modal').modal('hide')
  },

  _takeValuesFromUserData() {
    var userPreferences = ToWatchConstants.userData.preferences

    if (userPreferences.notifyOnListAddition) {
      document.getElementById('cb-list-shared').checked = true
    }
    else {
      document.getElementById('cb-list-shared').checked = false
    }

    if (userPreferences.notifyOnListMovieAddition) {
      document.getElementById('cb-movie-added').checked = true
    }
    else {
      document.getElementById('cb-movie-added').checked = false
    }

    switch (userPreferences.theme) {
      case 'pink-dark':
        document.getElementById('theme-chooser').value = 'pink-dark'
        break
      case 'gradient-blue-dark':
        document.getElementById('theme-chooser').value = 'gradient-blue-dark'
        break
      case 'gradient-pink-dark':
        document.getElementById('theme-chooser').value = 'gradient-pink-dark'
        break
      case 'blue-dark':
      default:
        document.getElementById('theme-chooser').value = 'blue-dark'
    }
  },

  _themeChanged() {
    var chosen = document.getElementById('theme-chooser').value
    switch (chosen) {
      case 'blue-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/blue-dark.css?r=' + Math.random())
        break
      case 'pink-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/pink-dark.css?r=' + Math.random())
        break
      case 'gradient-blue-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-blue-dark.css?r=' + Math.random())
        break
      case 'gradient-pink-dark':
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-pink-dark.css?r=' + Math.random())
        break
    }
  }

})

module.exports = EditPreferences