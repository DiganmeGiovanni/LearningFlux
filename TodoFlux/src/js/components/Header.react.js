
var React = require('react')
var TodoActions = require('../actions/TodoActions')
var TodoTextInput = require('./TodoTextInput.react')

/******************************************************************************/


var Header = React.createClass({

  render: function () {
    return (
      <header id="header">
        <h1>TODOs</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    )
  }

  /**
   * Event handler called within TodoTextInput
   * Defining this here allows TodoTextInput to be used in multiple
   * places in different ways
   * @param  {string} text
   */
  _onSave: function (text) {
    if (text.trim()) {
        TodoActions.create(text)
    }
  }

})

module.exports = Header
