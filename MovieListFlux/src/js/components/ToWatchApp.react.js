
/**
 * This component operates as a controller-view. It listens for
 * changes in the ToWatchStore and passes the new data to its children
 */

var React = require('react')

// React components
var Header      = require('./Header.react')
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
      <div>
        <Header />
        <ToWatchList allToWatchs={this.state.allToWatchs} areAllWatched={this.state.areAllWatched} />
      </div>
    )
  }

})

module.exports = ToWatchApp