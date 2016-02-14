
/**
 * This component operates as a controller-view. It listens for
 * changes in the ToWatchStore and passes the new data to its children
 */

var React = require('react')

// React components
var Toolbar      = require('./Toolbar.react')
var ToWatchList = require('./ToWatchList.react')

var ToWatchStore = require('../stores/ToWatchStore')

/*****************************************************************************/

function getToWatchState() {
  return {
    allToWatchs: ToWatchStore.getAll(),
    areAllWatched: ToWatchStore.areAllWatched()
  }
}

var ToWatchApp = React.createClass({

  getInitialState: function() {
    return getToWatchState()
  },

  componentDidMount: function () {
    ToWatchStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    ToWatchStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState(getToWatchState())
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8 col-md-offset-2 no-padding-on-small">
          <div className="panel panel-default">
            <div className="panel-heading">Movies to watch on next days</div>
            <div className="panel-body">
              <Toolbar />
              <hr/>

              <ToWatchList allToWatchs={this.state.allToWatchs} areAllWatched={this.state.areAllWatched} />
            </div>
          </div>
        </div>
      </div>
    )
  }

})

module.exports = ToWatchApp