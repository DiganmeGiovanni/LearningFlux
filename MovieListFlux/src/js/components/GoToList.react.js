
var React = require('react')
var moment = require('moment')
var ToWatchActions = require('../actions/ToWatchActions')

/******************************************************************************/

var GoToList = React.createClass({

  constructListItems() {
    var self = this
    var lists = this.props.listsWithoutContents
    var listItemsJSX = []

    for(var i=0; i< lists.length; i++) {
      var creationDate = moment(lists[i].createdAt).format('YYYY, MMMM Do')
      listItemsJSX.push(
        <div key={i}
          className="list-group-item"
          onClick={self._goToList.bind(null, lists[i].idDatastore)}
          style={{cursor: 'pointer'}}>

          <h4 className="list-group-item-heading">{lists[i].name}</h4>
          <p className="list-group-item-text">
            <span className="glyphicon glyphicon-user"></span>
            <span>&nbsp;&nbsp;{lists[i].ownerEmail}</span>

            <br/>
            <span className="glyphicon glyphicon-calendar"></span>
            <span>&nbsp;&nbsp;{creationDate}</span>
          </p>
        </div>
      )
    }

    return listItemsJSX
  },

  render() {
    var listItemsJSX = this.constructListItems()

    return (
      <div className="modal fade" id="goto-list-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Go to list</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <div className="list-group">
                    {listItemsJSX}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  _goToList(listIdDatastore) {
    ToWatchActions.fetchToWatchList(listIdDatastore)
    $('#goto-list-modal').modal('hide')
  }
})

module.exports = GoToList