
var React = require('react')

var ToWatchActions = require('../actions/ToWatchActions')

/*****************************************************************************/

var ToWatchItem = React.createClass({

  getInitialState: function () {
    return {
      displaySynopsis: false
    }
  },

  render: function () {
    var toWatch = this.props.toWatch

    var titleJSX = toWatch.title
    if (toWatch.isWatched) {
      titleJSX = (
        <span>
          <span className="glyphicon glyphicon-eye-open"></span>
          &nbsp;&nbsp;&nbsp;
          <del>{toWatch.title}</del>
        </span>
      )
    }

    var synopsisJSX = ""
    if (this.state.displaySynopsis) {
      synopsisJSX = (
        <blockquote>
          <p>
            <small>
              {toWatch.synopsis}
            </small>
          </p>
        </blockquote>
      )
    }

    return (
      <li className={toWatch.isWatched ? "list-group-item disabled" : "list-group-item"}>
        <h4 className="list-group-item-heading">{titleJSX}</h4>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <b>Director:</b> {toWatch.directors} <br/>
            <b>Genre:</b> {toWatch.genres}
          </div>
          <div className="col-xs-12 col-sm-6 text-right">
            <div className="btn-toolbar pull-right" role="toolbar">

              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={!toWatch.isWatched ? "btn btn-default" : "btn btn-default active"}
                  onClick={this._onToggleWatched}>
                    <span className="glyphicon glyphicon-eye-open"></span>
                </button>
                <button
                  type="button"
                  className={this.state.displaySynopsis ? "btn btn-default active" : "btn btn-default"}
                  onClick={this._onToggleDisplaySynopsis}>
                    <span className="glyphicon glyphicon-list-alt"></span>
                </button>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-danger"  onClick={this._onDestroyClick} >
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row"><br/>
          <div className="col-xs-12">{synopsisJSX}</div>
        </div>
      </li>
    )
  },

  _onToggleDisplaySynopsis: function () {
    this.setState({
      displaySynopsis: !this.state.displaySynopsis
    })
  },

  _onToggleWatched: function () {
    ToWatchActions.toggleWatched(this.props.toWatch)
  },

  _onDestroyClick: function () {
    ToWatchActions.destroy(this.props.toWatch.tmdbId)
  }

})

module.exports = ToWatchItem