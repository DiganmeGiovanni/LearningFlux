
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')
var ToWatchForm    = require('./ToWatchForm.react')

/*****************************************************************************/

var Toolbar = React.createClass({

  render: function () {
    return (
      <div id="main-toolbar" className="row">
        <div className="col-xs-12">
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

          <ToWatchForm />
        </div>
      </div>
    )
  },

  _deleteWatchedMovies() {
    ToWatchActions.destroyWatched()
  },

  _onSave: function (title) {
    if (title.trim()) {
      ToWatchActions.create(title, 'No genre', 'Director', 'lorem ipsum ...')
    }
  },

})

module.exports = Toolbar