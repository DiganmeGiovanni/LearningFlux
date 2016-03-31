
var React = require('react')

var ToWatchActions  = require('../actions/ToWatchActions')
var LoginActions    = require('../actions/UserActions')
var ToWatchForm     = require('./towatchform/ToWatchForm.react')
var ShareList       = require('./ShareList.react')
var CreateList      = require('./CreateList.react')
var GoToList        = require('./GoToList.react')
var EditPreferences = require('./EditPreferences.react')

/*****************************************************************************/

var Toolbar = React.createClass({

  render: function () {
    return (
      <div>
        <div className="top-bar">
          <div className="col-sm-4 hidden-xs">
            <img
              src="http://framesinaction.com/wp-content/uploads/2016/02/clapper-icon.png"
              alt="logo"
              width="38px"
              height="38px" />
            {/*<h1 style={{margin: '0px'}}>WATCHLIST</h1>*/}
          </div>

          <div className="col-xs-12 col-sm-8" style={{paddingRight: '0px', paddingTop: '4px'}}>
            <div className="pull-right">
              <div className="btn-group">
                <button
                  className="btn btn-link btn-transparent hidden-xs"
                  data-target="#towatch-form-modal"
                  data-toggle="modal"
                  type="button">
                  <span>
                    <span className="glyphicon glyphicon-film"></span>
                    <span>
                      <span className="hidden-xs">&nbsp;&nbsp;ADD MOVIE</span>
                      <span className="visible-xs-inline">&nbsp;&nbsp;Add</span>
                    </span>
                  </span>
                </button>
              </div>

              <div className="btn-group">
                <button
                  className="btn btn-link btn-transparent"
                  data-target="#share-list-modal"
                  data-toggle="modal"
                  type="button">
                  <span className="glyphicon glyphicon-share"></span>
                  <span>&nbsp;&nbsp;SHARE LIST</span>
                </button>
              </div>

              <div className="btn-group">
                <button
                  className="btn btn-link btn-transparent"
                  onClick={this._deleteCurrentList}>
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
                <button
                  className="btn btn-link btn-transparent"
                  data-target="#preferences-modal"
                  data-toggle="modal">
                  <span className="glyphicon glyphicon-cog" />
                </button>

                {/* More options */}
                <button className="btn btn-link btn-transparent dropdown-toggle" data-toggle="dropdown">
                  <span className="glyphicon glyphicon-option-vertical"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    <a
                      href="#"
                      data-target="#create-list-modal"
                      data-toggle="modal">
                      <span className="glyphicon glyphicon-th-list"></span>
                      <span>&nbsp;&nbsp;Create another list</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={this._displayListChooser} >
                      <span className="glyphicon glyphicon-share-alt"></span>
                      <span>&nbsp;&nbsp;Go to list</span>
                    </a>
                  </li>
                  <li role="separator" className="divider" />
                  <li>
                    <a
                      href="#"
                      onClick={this._logout}>
                      <span className="glyphicon glyphicon-off"></span>
                      <span>&nbsp;&nbsp;Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAB Button for extra small devices */}
        <button
          className="btn btn-fab visible-xs-block"
          data-target="#towatch-form-modal"
          data-toggle="modal"
          type="button">
          <span className="glyphicon glyphicon-plus"></span>
        </button>

        <ToWatchForm />
        <ShareList currentList={this.props.currentList} />
        <CreateList />
        <GoToList listsWithoutContents={this.props.listsWithoutContents}/>

        <EditPreferences />
      </div>
    )
  },

  _deleteCurrentList() {
    ToWatchActions.deleteCurrList()
  },

  _deleteWatchedMovies() {
    ToWatchActions.destroyWatched()
  },

  _displayListChooser() {
    ToWatchActions.fetchListsWithoutContents()
    $('#goto-list-modal').modal('show')
  },

  _logout() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      LoginActions.logoutUser()
    });
  },

})

module.exports = Toolbar
