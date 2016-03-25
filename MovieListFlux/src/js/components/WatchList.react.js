
var React = require('react')

var WatchListItem = require('./WatchListItem.react')

/******************************************************************************/

var WatchList = React.createClass({

  getInitialState() {
    return {
      allToWatches: this.props.toWatches,
      idDisplayedItem: '' // The id data store of item which display details
    }
  },

  render() {
    var self = this
    var allToWatches = this.state.allToWatches
    var toWatchesJSX = []

    // Construct the JSX for each 'to watch' item
    for(var i=0; i< allToWatches.length; i++) {
      if (allToWatches[i].isActive && !allToWatches[i].isWatched) {

        // Should display details?
        var idDisplayedItem = self.state.idDisplayedItem
        var displayDetails = idDisplayedItem === allToWatches[i].idDatastore

        // Create Watch list item and push it to JSX array
        toWatchesJSX.push(
          <WatchListItem
            key={allToWatches[i].tmdbId}
            displayDetails={displayDetails}
            displayItemDetails={this.displayItemDetails}
            toWatch={allToWatches[i]} />
        )
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Personal list</h3>
          <hr />
        </div>
        {toWatchesJSX}
      </div>
    )

  },

  displayItemDetails(idDatastore) {
    this.setState({
      idDisplayedItem: idDatastore
    })
  },

})

module.exports = WatchList