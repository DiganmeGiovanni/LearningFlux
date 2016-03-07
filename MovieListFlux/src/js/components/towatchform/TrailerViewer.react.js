
var React = require('react')

var TrailerViewer = React.createClass({

  getInitialState() {
    return {

    }
  },

  componentDidMount() {
    console.log('Lets to see: ' + this.props.videoId)
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
          <h4 className="modal-title">Trailers for movie: {this.props.movieTitle}</h4>
        </div>

        <div className="modal-body">
          <div id="yt-player"></div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-default" onClick={this.backToList.bind(this)}>
            <span>Back to list</span>
          </button>
          <button className="btn btn-success" onClick={this.chooseTrailer.bind(this)}>
            <span>Choose trailer</span>
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