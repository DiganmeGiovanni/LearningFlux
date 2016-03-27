
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')

/******************************************************************************/

var ShareList = React.createClass({

  constructModalContent() {
    if (this.props.currentList.isPersonalList) {
      return (
        <div className="modal-body">
          <div className="row">
            <div className="col-xs-12 text-center">
              <div className="alert alert-danger">
                <h4>Your personal list can not be shared (IT'S PERSONAL).</h4>
              </div>
              <span>
                You can create another list using the menu and share it
                with whoever you want.
                <br/><br/>
              </span>
            </div>
          </div>
        </div>
      )
    }
    else {
      var sharedWithJSX = this.constructSharedWithLabels()
      return (
        <div className="modal-body">
          <div className="row">
            <div className="col-xs-12">
              <b>Share with:</b>
            </div>
            <div className="col-xs-8 col-sm-10">
              <input type="text" className="form-control" id="inp-share-with" />
              <br/>
              <span id="share-with-email-alert" className="alert alert-danger hidden">Please type a valid email</span>
            </div>
            <div className="col-xs-4 col-sm-2 no-padding-left">
              <button
                type="button"
                onClick={this._shareList}
                className="btn btn-primary btn-block">
                <span className="glyphicon glyphicon-send"></span>
                <span>&nbsp;&nbsp;Share</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12"><br/>
              <b>Currently shared with:</b>
              <div>
                {sharedWithJSX}
              </div>
            </div>
          </div>
        </div>
      )
    }
  },

  constructSharedWithLabels() {
    var sharedWith = this.props.currentList.sharedWith
    var sharedWithJSX = []

    if (sharedWith.length < 1) {
      sharedWithJSX.push(
        <em key={'randomKey'}>You have not even shared your list</em>
      )
    }
    else {

      // Styles for 'shared with' labels
      var styleLabel = {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '5px'
      }

      for (var i = 0; i < sharedWith.length; i++) {
        sharedWithJSX.push(
          <span key={sharedWith[i]} style={styleLabel}>
            <span className="label label-primary">{sharedWith[i]}</span>
            <span>&nbsp;</span>
          </span>
        )
      }
    }

    return sharedWithJSX
  },

  render() {
    var modalContentJSX = this.constructModalContent()

    return (
      <div className="modal fade" id="share-list-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.currentList.name}</h4>
            </div>
            {modalContentJSX}
          </div>
        </div>
      </div>
    )
  },

  _shareList() {
    if(this._validateForm()) {
      var friendEmail = document.getElementById('inp-share-with').value
      ToWatchActions.shareCurrentList(friendEmail)

      document.getElementById('inp-share-with').value = ""
      document.getElementById('inp-share-with').focus()
    }
  },

  _validateForm() {
    $('#share-with-email-alert').addClass('hidden')

    var friendEmail = document.getElementById('inp-share-with').value
    if (friendEmail && friendEmail.trim().length > 0) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(re.test(friendEmail)) {
        return true;
      }
    }

    $('#share-with-email-alert').removeClass('hidden')
    return false
  }
})

module.exports = ShareList