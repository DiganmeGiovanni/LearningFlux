
var React = require('react')

/*****************************************************************************/

var ENTER_KEY_CODE = 13;

var ToWatchForm = React.createClass({

  getInitialState: function () {
    return {
      value: this.props.value || ""
    }
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8 col-md-offset-2">
          <input
            autoFocus={true}
            className="form-control"
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            placeholder={this.props.placeholder}
            type="text"
            value={this.state.value}
          />
        </div>
      </div>
    )
  },

  save: function () {
    this.props.onSave(this.state.value)
    this.setState({
      value: ''
    })
  },
  
  _onChange: function (event) {
    this.setState({
      value: event.target.value
    })
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.save()
    }
  }

})

module.exports = ToWatchForm