

var React = require('react')

var ToWatchItem = require('./ToWatchItem.react')

/*****************************************************************************/

var ToWatchList = React.createClass({

  render: function () {

    var allToWatchs = this.props.allToWatchs
    var toWatchs = []
    var watchedItems = []

    console.log('We have ' + allToWatchs.length + " items")
    for(var i=0; i< allToWatchs.length; i++) {
      if(!allToWatchs[i].isWatched && allToWatchs[i].isActive) {
        toWatchs.push(<ToWatchItem key={allToWatchs[i].id} toWatch={allToWatchs[i]}/>)
      }
    }

    for(var i=0; i<allToWatchs.length; i++) {
      if(allToWatchs[i].isWatched && allToWatchs[i].isActive) {
        watchedItems.push(<ToWatchItem key={allToWatchs[i].id} toWatch={allToWatchs[i]} />)
      }
    }

    return (
      <div id="to-watches-container" className="list-group">
        {toWatchs}
        <hr/>
        {watchedItems}
      </div>
    )
  }
})

module.exports = ToWatchList