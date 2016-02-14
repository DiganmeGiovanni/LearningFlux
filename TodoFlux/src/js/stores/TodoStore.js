/**
 * Created by giovanni on 1/18/16.
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter  = require('events').EventEmitter
var TodoConstants = require('../constants/TodoConstants')
var assign        = require('object-assign')

/*****************************************************************************/

var CHANGE_EVENT = 'change'
var _todos = []

/**
 * Create a to-do item
 * @param text
 */
function create(text) {

  // using current timestamp + random number to generate id
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
  _todos[id] = {
    'id': id,
    'complete': false,
    'text': text
  }
}

/**
 * Update a to-do item
 * @param id
 * @param updates
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates)
}

/**
 * Update all of the to-do items with the same object
 * @param updates An object literal containing only the data
 *        to be updated
 */
function updateAll(updates) {
  for(var id in updates) {
    update(id, updates)
  }
}

/**
 * Deletes a to-do item
 * @param id
 */
function destroy(id) {
  delete _todos[id]
}

function destroyCompleted() {
  for(var id in _todos) {
    if (_todos[id].complete) {
      destroy[id]
    }
  }
}


var TodoStore = assign({}, EventEmitter.prototype, {

  areAllComplete: function () {
    for(var id in _todos) {
      if(!_todos[id].complete) {
        return false
      }
    }

    return true
  },


  getAll: function () {
    return _todos
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

});

AppDispatcher.register(function (action) {
  var text;

  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim()
      if (text !== '') {
        create(text)
        TodoStore.emitChange()
      }
      break

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false})
      }
      else {
        updateAll({complete: true})
      }
      TodoStore.emitChange()
      break

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true})
      TodoStore.emitChange()
      break

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim()
      if (text !== '') {
        update(action.id, {text: text})
        TodoStore.emitChange()
      }
      break

    case TodoConstants.TODO_DESTROY:
      destroy(action.id)
      TodoStore.emitChange()

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted()
      TodoStore.emiteChange()
      break

    default:
      // Do nothing

  }

})

module.exports = TodoStore
