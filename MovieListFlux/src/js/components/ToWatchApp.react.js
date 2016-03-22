
/**
 * This component operates as a controller-view. It listens for
 * changes in the ToWatchStore and passes the new data to its children
 */

var React = require('react')
var WatchList = require('./WatchList.react')

// React components
var Toolbar     = require('./Toolbar.react')
var Welcome     = require('./Welcome.react')

var ToWatchStore = require('../stores/ToWatchStore')
var LoginStore   = require('../stores/LoginStore')

/*****************************************************************************/

function getToWatchState() {
  return {
    allToWatchs: ToWatchStore.getAll(),
    areAllWatched: ToWatchStore.areAllWatched(),
    isUserLogged: LoginStore.isUserLogged()
  }
}

var ToWatchApp = React.createClass({

  getInitialState: function() {
    return getToWatchState()
  },

  componentDidMount: function () {
    ToWatchStore.addChangeListener(this._onChange)
    LoginStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    ToWatchStore.removeChangeListener(this._onChange)
    LoginStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState(getToWatchState())
  },

  render: function() {
    if(this.state.isUserLogged) {
      return (
        <div className="container">
          {/*<Toolbar />*/}

          <div style={{marginTop: '100px'}}>
            <WatchList
              toWatches={this.state.allToWatchs}
              areAllWatched={this.state.areAllWatched}
            />
          </div>
        </div>
      )
    }
    else {
      return (
        <Welcome />
      )
    }
  }

})

module.exports = ToWatchApp