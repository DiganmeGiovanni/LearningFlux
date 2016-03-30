
var React = require('react')

var ToWatchActions   = require('../actions/ToWatchActions')
var ToWatchConstants = require('../constants/toWatchConstants')

/******************************************************************************/

var CreateList = React.createClass({

  render() {

    return (
      <div className="modal fade" id="create-list-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Create list</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <b>List name</b>
                </div>
                <div className="col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    id="inp-list-name"
                    placeholder="Type a name for your list"/>
                  <br/>
                  <span id="list-name-alert" className="alert alert-danger hidden">
                    List name must have 3 or more characters
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={this._createList}>
                <span className="glyphicon glyphicon-cloud-upload"></span>
                <span>&nbsp;&nbsp;&nbsp;Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },

  _createList() {
    $('#list-name-alert').addClass('hidden')
    if(this._validateForm()) {

      var listName = document.getElementById('inp-list-name').value
      document.getElementById('inp-list-name').value = ""

      var email = ToWatchConstants.userData.email
      if (email && email.length > 0) {

        ToWatchActions.createList(listName, email)
        $('#create-list-modal').modal('hide')
      }
    }
    else {
      $('#list-name-alert').removeClass('hidden')
    }
  },

  _validateForm() {
    var listName = document.getElementById('inp-list-name').value
    return listName.trim().length >= 3
  }

})

module.exports = CreateList