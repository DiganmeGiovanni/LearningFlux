
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')

/******************************************************************************/

var EditPreferences = React.createClass({

  render() {
    return(
      <div className="modal fade" id="preferences-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Preferences</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <b>Theme</b>
                  <select className="form-control">
                    <option value="default-dark">Default dark</option>
                    <option value="default-dark">Default light</option>
                    <option value="default-dark">Pink dark</option>
                    <option value="default-dark">Pink light</option>
                    <option value="default-dark">Blurred dark</option>
                    <option value="default-dark">Blurred dark</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><br/>
                  <b>Email Notifications</b>
                </div>
                <div className="col-xs-12">
                  <span><input type="checkbox" value=""/>&nbsp;&nbsp;List shared with me</span>
                </div>
                <div className="col-xs-12">
                  <span><input type="checkbox" value=""/>&nbsp;&nbsp;Movie added to your lists</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-default">Cancel</button>
              <button className="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

})

module.exports = EditPreferences