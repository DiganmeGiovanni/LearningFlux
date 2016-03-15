
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')
var LoginActions   = require('../actions/LoginActions')
var ToWatchForm    = require('./towatchform/ToWatchForm.react')

/*****************************************************************************/

var Toolbar = React.createClass({

  render: function () {
    return (
      <div className="top-bar">
        <div className="col-sm-4 hidden-xs">
          <h1 className="glyphicon glyphicon-film" style={{margin: '0px'}}></h1>
        </div>
        <div className="col-xs-6 col-sm-4 text-center">
          <div className="input-group">
            <span className="input-group-addon" id="">
              <span className="glyphicon glyphicon-search"></span>
            </span>
            <input type="text" className="form-control" placeholder="Search in your list" />
          </div>
        </div>
        <div className="col-xs-6 col-sm-4 text-right">
          <div className="btn-group">
            <button
              className="btn btn-default"
              data-target="#towatch-form-modal"
              data-toggle="modal"
              type="button">
                <span>
                  <span className="hidden-xss">
                    <span className="glyphicon glyphicon-film"></span>
                    <span className="hidden-xss" style={{color: '#777'}}>
                      &nbsp;&nbsp;
                      <strong className="hidden-xs">Add movie</strong>
                      <strong className="visible-xs-inline">Add</strong>
                    </span>
                  </span>
                </span>
            </button>
            <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">
              <span className="glyphicon glyphicon-option-horizontal"></span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-trash"></span>
                  <span>&nbsp;&nbsp;Drop watched</span>
                </a>
              </li>
              <hr/>
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-th-list"></span>
                  <span>&nbsp;&nbsp;Create list</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-transfer"></span>
                  <span>&nbsp;&nbsp;Share list</span>
                </a>
              </li>
              <hr/>
              <li>
                <a href="#" onClick={this._logout}>
                  <span className="glyphicon glyphicon-log-out"></span>
                  <span>&nbsp;&nbsp;Logout</span>
                </a>
              </li>
            </ul>
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