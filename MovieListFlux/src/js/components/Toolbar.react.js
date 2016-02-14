
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')
var ToWatchForm    = require('./ToWatchForm.react')

/*****************************************************************************/

var Header = React.createClass({

  render: function () {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h1>Movies to watch</h1>
          </div>
        </div>
        <div id="main-toolbar" className="row">
          <div className="col-xs-12 text-center">
            <div className="btn-group" role="group">
              <button
                className="btn btn-primary"
                data-target="#towatch-form-modal"
                data-toggle="modal"
                type="button">Add a movie to list</button>
              <button type="button" className="btn btn-danger">Delete watched movies</button>
            </div>

            <ToWatchForm />
          </div>
        </div>
      </div>
    )
  },

  _onSave: function (title) {
    if (title.trim()) {
      ToWatchActions.create(title, 'No genre', 'Director', 'lorem ipsum ...')
    }
  },

})

module.exports = Header