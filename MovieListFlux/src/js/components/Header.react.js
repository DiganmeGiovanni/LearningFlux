
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')
var ToWatchForm    = require('./ToWatchForm.react')

/*****************************************************************************/

var Header = React.createClass({

  render: function () {
    return (
      <div>
        <h1>Movies pending to watch</h1>
        <ToWatchForm
          placeholder="What movie you want to see?"
          onSave={this._onSave}
        />
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