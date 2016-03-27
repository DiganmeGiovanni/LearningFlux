
var React = require('react')

var ToWatchActions = require('../actions/ToWatchActions')
var LoginActions   = require('../actions/LoginActions')
var ToWatchForm    = require('./towatchform/ToWatchForm.react')
var ShareList      = require('./ShareList.react')
var CreateList     = require('./CreateList.react')
var GoToList       = require('./GoToList.react')

/*****************************************************************************/

var Toolbar = React.createClass({

  render: function () {
    return (
      <div>
        <div className="top-bar">
          <div className="col-sm-4 hidden-xs">
            <img
              src="https://cdn0.iconfinder.com/data/icons/multimedia-and-electronics/512/film_roll_strip_movie_video_cinema_equipment_reel_cassette_retro_hollywood_filmstrip_industry_media_cinematography_flat_design_icon-512.png"
              alt="logo"
              width="38px"
              height="38px" />
            {/*<h1 style={{margin: '0px'}}>WATCHLIST</h1>*/}
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
                <button
                  className="btn btn-primary btn-topbar"
                  data-target="#share-list-modal"
                  data-toggle="modal"
                  type="button">
                  <span className="glyphicon glyphicon-share"></span>
                  <span>&nbsp;&nbsp;Share list</span>
                </button>
              </div>

              <div className="btn-group">
                <button className="btn btn-primary btn-topbar">
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
                <button
                  className="btn btn-primary btn-topbar"
                  onClick={this._logout}>
                  <span className="glyphicon glyphicon-off"></span>
                </button>

                {/* More options */}
                <button className="btn btn-primary btn-topbar dropdown-toggle" data-toggle="dropdown">
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
        <ShareList currentList={this.props.currentList} />
        <CreateList />
        <GoToList listsWithoutContents={this.props.listsWithoutContents}/>
      </div>
    )
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