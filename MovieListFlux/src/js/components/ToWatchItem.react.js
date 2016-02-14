
var React = require('react')

var ToWatchActions = require('../actions/ToWatchActions')

/*****************************************************************************/

var ToWatchItem = React.createClass({

  render: function () {
    var toWatch = this.props.toWatch

    return (
      <li>
        <div className="towatch-item">
          <input type="checkbox" checked={toWatch.isWatched} onchange={this._onToggleWatched} />
          <label>{toWatch.title}</label>&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" onClick={this._onDestroyClick}>Remove</button>
        </div>
      </li>
    )
  },

  _onToggleWatched: function () {
    ToWatchActions.toggleWatched(this.props.toWatch)
  },

  _onDestroyClick: function () {
    ToWatchActions.destroy(this.props.toWatch.id)
  }

})

module.exports = ToWatchItem