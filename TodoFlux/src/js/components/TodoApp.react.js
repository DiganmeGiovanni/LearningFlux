
/**
 * This component operates as a controller-view. It listens for
 * changes in the TodoStore and passes the new data to its children
 */


var React       = require('react')

var Footer      = require('./Footer.react')
var Header      = require('./Header.react')
var MainSection = require('./MainSection.react')

var TodoStore   = require('../stores/TodoStore')

/******************************************************************************/


function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }
}

var TodoApp = React.createClass({

  getInitialState: function () {
    return getTodoState()
  },

  componentDidMount: function () {
    TodoStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    TodoStore.removeChangeListener(this._onChange)
  },

  render: function () {
    return (
      <div>
        <Header />
        <MainSection
            allTodos={this.state.allTodos}
            areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    )
  },

  /**
   * Event handler for 'chage' events comming from TodoStore
   */
  _onChange: function () {
    this.setState(getTodoState())
  },

})

module.exports = TodoApp
