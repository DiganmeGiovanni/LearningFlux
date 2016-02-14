

var React = require('react')

var ToWatchItem = require('./ToWatchItem.react')

/*****************************************************************************/

var ToWatchList = React.createClass({

  render: function () {

    var allToWatchs = this.props.allToWatchs
    var toWatchs = []

    /*if (allToWatchs.length === 0)  {
      return null
    }*/

    for(var i=0; i< allToWatchs.length; i++) {
      toWatchs.push(<ToWatchItem key={allToWatchs[i].id} toWatch={allToWatchs[i]} />)
    }

    return (
      <section id="to-watches-container">
        <ul id="all-to-watches">{toWatchs}</ul>
      </section>
    )
  }
})

module.exports = ToWatchList