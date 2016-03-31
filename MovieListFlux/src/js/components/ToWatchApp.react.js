
/**
 * This component operates as a controller-view. It listens for
 * changes in the ToWatchStore and passes the new data to its children
 */

var React     = require('react')
var WatchList = require('./WatchList.react')

var Toolbar      = require('./Toolbar.react')
var Welcome      = require('./Welcome.react')
var ToWatchStore = require('../stores/ToWatchStore')
var LoginStore   = require('../stores/UserStore')

/*****************************************************************************/

function getToWatchState() {
  return {
    areAllWatched: ToWatchStore.areCurrentListAllWatched(),
    currentList: ToWatchStore.getCurrentList(),
    isUserLogged: LoginStore.isUserLogged(),
    listsWithoutContents: ToWatchStore.getListsWithoutContents()
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
          <Toolbar
            currentList={this.state.currentList}
            listsWithoutContents={this.state.listsWithoutContents}
          />

          <div style={{marginTop: '60px'}}>
            <WatchList
              areAllWatched={this.state.areAllWatched}
              listName={this.state.currentList.name}
              toWatches={this.state.currentList.movies}
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