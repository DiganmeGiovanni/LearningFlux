
var React = require('react')

/******************************************************************************/

var TrailerViewer = React.createClass({

  getInitialState() {
    return {

    }
  },

  componentDidMount() {
    new YT.Player('yt-player', {
      width: '100%',
      videoId: this.props.videoId,
      events: {
        'onReady': function (event) {
          event.target.playVideo()
        }
      }
    })
  },

  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">{this.props.movieTitle}</h4>
        </div>

        <div className="modal-body">
          <div id="yt-player"></div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-default" onClick={this.backToList}>
            <span className="glyphicon glyphicon-triangle-left"></span>
            <span>&nbsp;Back to list</span>
          </button>
          <button className="btn btn-success" onClick={this.chooseTrailer}>
            <span className="glyphicon glyphicon-check"></span>
            <span>&nbsp;&nbsp;Choose trailer</span>
          </button>
        </div>
      </div>
    )
  },

  backToList: function () {
    this.props.showTrailersList()
  },

  chooseTrailer: function () {
    this.props.chooseTrailer(this.props.videoId)
  }


})

module.exports = TrailerViewer