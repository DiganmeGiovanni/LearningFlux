
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')
var LoginActions   = require('../actions/LoginActions')
var ToWatchForm    = require('./towatchform/ToWatchForm.react')

/*****************************************************************************/

var Toolbar = React.createClass({

  render: function () {
    return (
      <div id="main-toolbar" className="row">
        <div className="col-xs-12">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group" role="group">
              <button
                className="btn btn-primary"
                data-target="#towatch-form-modal"
                data-toggle="modal"
                type="button">
                  <span>
                    <span className="glyphicon glyphicon-film"></span>
                    <span>&nbsp;&nbsp;Add movie</span>
                  </span>
              </button>
              <button
                className="btn btn-danger"
                onClick={this._deleteWatchedMovies}
                type="button">
                  <span>
                    <span className="glyphicon glyphicon-trash"></span>
                    <span>&nbsp;&nbsp;Delete watched</span>
                  </span>
              </button>
            </div>

            <div className="btn-group">
              <button
                className="btn btn-default"
                onClick={this._logout}
                type="button">
                <span>
                  <span className="glyphicon glyphicon-log-out"></span>
                  <span>&nbsp;&nbsp;Logout</span>
                </span>
              </button>
            </div>
          </div>

          <ToWatchForm />
        </div>
      </div>
    )
  },

  _deleteWatchedMovies() {
    ToWatchActions.destroyWatched()
  },

  _logout() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      LoginActions.logoutUser()
    });
  },

})

module.exports = Toolbar