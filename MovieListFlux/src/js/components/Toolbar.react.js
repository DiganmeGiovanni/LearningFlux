
var React = require('react')

var ToWatchActions = require('../actions/ToWatchActions')
var LoginActions   = require('../actions/LoginActions')
var ToWatchForm    = require('./towatchform/ToWatchForm.react')

/*****************************************************************************/

var Toolbar = React.createClass({

  render: function () {
    return (
      <div>
        <div className="top-bar">
          <div className="col-sm-4 hidden-xs">
            <h1 style={{margin: '0px'}}>WATCHLIST</h1>
          </div>

          <div className="col-xs-12 col-sm-8" style={{paddingRight: '0px', paddingTop: '4px'}}>
            <div className="btn-toolbar pull-right">
              <div className="btn-group">
                <button
                  className="btn btn-primary btn-topbar hidden-xs"
                  data-target="#towatch-form-modal"
                  data-toggle="modal"
                  type="button">
                  <span>
                    <span className="glyphicon glyphicon-film"></span>
                    <span>
                      <span className="hidden-xs">&nbsp;&nbsp;Add movie</span>
                      <span className="visible-xs-inline">&nbsp;&nbsp;Add</span>
                    </span>
                  </span>
                </button>
              </div>

              <div className="btn-group">
                <button className="btn btn-primary btn-topbar">
                  <span className="glyphicon glyphicon-share"></span>
                  <span>&nbsp;&nbsp;Share list</span>
                </button>
              </div>

              <div className="btn-group">
                <button className="btn btn-primary btn-topbar">
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
                <button className="btn btn-primary btn-topbar">
                  <span className="glyphicon glyphicon-off"></span>
                </button>

                {/* More options */}
                <button className="btn btn-primary btn-topbar dropdown-toggle" data-toggle="dropdown">
                  <span className="glyphicon glyphicon-option-vertical"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="#">
                      <span className="glyphicon glyphicon-th-list"></span>
                      <span>&nbsp;&nbsp;Create list</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="glyphicon glyphicon-transfer"></span>
                      <span>&nbsp;&nbsp;Change to list</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAB Button for extra small devices */}
        <button
          className="btn btn-primary btn-fab-blue visible-xs-block"
          data-target="#towatch-form-modal"
          data-toggle="modal"
          type="button">
          <span className="glyphicon glyphicon-plus"></span>
        </button>

        <ToWatchForm />
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