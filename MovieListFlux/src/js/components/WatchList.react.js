
var React = require('react')

var WatchListItem = require('./WatchListItem.react')

/******************************************************************************/

var WatchList = React.createClass({

  getInitialState() {
    return {
      idDisplayedItem: '', // The id 'tmdbid' of item which display details
      idWatchedDisplayedItem: ''
    }
  },

  render() {
    var self = this
    var toWatches = this.props.toWatches
    var toWatchesJSX = []
    var toWatchesWatchedJSX = []

    // Construct the JSX for each 'to watch' item
    for(var i=0; i< toWatches.length; i++) {
      if (toWatches[i].isActive && !toWatches[i].isWatched) {

        // Should display details?
        var idDisplayedItem = self.state.idDisplayedItem
        var displayDetails = idDisplayedItem === toWatches[i].tmdbId

        // Create Watch list item and push it to JSX array
        toWatchesJSX.push(
          <WatchListItem
            key={toWatches[i].tmdbId}
            displayDetails={displayDetails}
            displayItemDetails={self.displayItemDetails}
            toWatch={toWatches[i]} />
        )
      }
      else {

        // Should display details?
        var idDisplayedItem = self.state.idWatchedDisplayedItem
        var displayDetails = idDisplayedItem === toWatches[i].tmdbId

        // Create Watch list item and push it to JSX array
        toWatchesWatchedJSX.push(
          <WatchListItem
            key={toWatches[i].tmdbId}
            displayDetails={displayDetails}
            displayItemDetails={self.displayItemDetails}
            toWatch={toWatches[i]} />
        )
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <h3>{this.props.listName}</h3>
              <hr />
            </div>
            {toWatchesJSX}
          </div>
        </div>
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <h4 className="subtle-text">Yet watched items:</h4>
            </div>
            {toWatchesWatchedJSX}
          </div>
        </div>
      </div>
    )

  },

  displayItemDetails(tmdbId, isWatched) {
    if(isWatched) {
      this.setState({
        idDisplayedItem: '',
        idWatchedDisplayedItem: tmdbId
      })
    }
    else {
      this.setState({
        idDisplayedItem: tmdbId,
        idWatchedDisplayedItem: ''
      })
    }
  },

})

module.exports = WatchList