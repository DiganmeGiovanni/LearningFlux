

var React       = require('react')
var ToWatchItem = require('./ToWatchItem.react')

/*****************************************************************************/

var ToWatchList = React.createClass({

  getInitialState() {
    return {
      noWatchedDetailedItemId: '', // IdDatastore of item which display details
      watchedDetailsItemId: ''     // IdDatastore of item which display details
    }
  },

  render: function () {
    var self = this

    var allToWatchs = this.props.allToWatchs
    var toWatchs = []
    var watchedItems = []

    for(var i=0; i< allToWatchs.length; i++) {
      if(!allToWatchs[i].isWatched && allToWatchs[i].isActive) {
        var displayedIdDatastore = self.state.noWatchedDetailedItemId
        var displayDetails = displayedIdDatastore === allToWatchs[i].idDatastore

        toWatchs.push(
          <ToWatchItem
            key={allToWatchs[i].tmdbId}
            displayDetails={displayDetails}
            displayNoWatchedDetails={this.displayNoWatchedDetails}
            toWatch={allToWatchs[i]} />
        )
      }
    }

    for(var i=0; i<allToWatchs.length; i++) {
      if(allToWatchs[i].isWatched && allToWatchs[i].isActive) {
        watchedItems.push(<ToWatchItem key={allToWatchs[i].tmdbId} toWatch={allToWatchs[i]} />)
      }
    }

    return (
      <div id="to-watches-container" className="row">
        <div className="col-xs-12">
          {toWatchs}
        </div>
        {/*<hr/>*/}
        <div className="col-xs-12">
          {watchedItems}
        </div>
      </div>
    )
  },

  displayNoWatchedDetails(idDatastore) {
    this.setState({
      noWatchedDetailedItemId: idDatastore
    })
  },

  displayWatchedDetails(idDatastore) {
    this.setState({
      noWatchedDetailedItemId: idDatastore
    })
  }
})

module.exports = ToWatchList