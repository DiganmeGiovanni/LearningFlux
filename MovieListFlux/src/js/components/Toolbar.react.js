
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
            <h1 className="glyphicon glyphicon-film" style={{margin: '0px'}}></h1>
          </div>

          <div className="col-xs-12 col-sm-8">
            <div className="btn-toolbar pull-right">
              <div className="btn-group">
                <button
                  className="btn btn-default"
                  data-target="#towatch-form-modal"
                  data-toggle="modal"
                  type="button">
                  <span>
                    <span className="hidden-xss">
                      <span className="glyphicon glyphicon-film"></span>
                      <span>
                        <span className="hidden-xs">&nbsp;&nbsp;Add movie</span>
                        <span className="visible-xs-inline">&nbsp;&nbsp;Add</span>
                      </span>
                    </span>
                  </span>
                </button>
              </div>

              <div className="btn-group">
                <button className="btn btn-default">
                  <span className="glyphicon glyphicon-share"></span>
                  <span>&nbsp;&nbsp;Share list</span>
                </button>
                <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                  <span className="glyphicon glyphicon-option-horizontal"></span>
                </button>
                <ul className="dropdown-menu">
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

              <div className="btn-group">
                <button className="btn btn-default">
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
                <button className="btn btn-default">
                  <span className="glyphicon glyphicon-off"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

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