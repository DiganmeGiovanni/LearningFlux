
var React = require('react')

var youtubeService = require('../../services/youtubeService')

/******************************************************************************/

var TrailerChooser = React.createClass({

  getInitialState() {
    return {
      youtubeTrailers: []
    }
  },

  componentDidMount() {
    this.searchYoutubeTrailer()
  },

  constructTrailersList() {
    var trailers = this.state.youtubeTrailers

    var youtubeTrailersJSX = []
    for(var i=0; i<trailers.length; i++) {
      var trailer = trailers[i]

      youtubeTrailersJSX.push(
        <div key={trailer.videoId} className="row">
          <div className="col-xs-12">
            <div className="card-result">
              <div className="row">

                {/* Video title on extra small devices */}
                <div className="col-xs-12 visible-xs-block">
                  <h5 style={{marginLeft: '15px'}}>{trailer.videoTitle}</h5>
                </div>

                <div className="col-xs-12">
                  <img
                    src={trailer.videoImgUrl}
                    alt="Youtube video image"
                    width="196"
                    height="140"
                    className="pull-left trailer-chooser-result-image" />

                  {/* Video title for small and up devices */}
                  <h5 className="hidden-xs">{trailer.videoTitle}</h5>

                  <div className="card-result-bottom-buttons">
                    <div className="btn-group">
                      <button
                        className="btn btn-default"
                        onClick={this.chooseTrailer.bind(null, trailer.videoId)}
                        type="button">
                        <span className="glyphicon glyphicon-check"></span>
                        <span className="hidden-xs">&nbsp;&nbsp;Choose</span>
                      </button>
                      <button
                        className="btn btn-default"
                        onClick={this.playTrailer.bind(null, trailer.videoId)}
                        type="button">
                        <span className="glyphicon glyphicon-play"></span>
                        <span className="hidden-xs">&nbsp;&nbsp;Watch</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )
    }

    return youtubeTrailersJSX
  },

  render() {
    var trailersJSX = this.constructTrailersList()
    var styleChooser = {
      'height': '500px',
      'maxHeight': '500px',
      'overflow': 'auto'
    }

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">{this.props.movieTitle}</h4>
        </div>

        <div className="modal-body" style={styleChooser}>
          <div className="row">
            <div className="col-xs-12">
              {trailersJSX}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{borderTop: '1px solid #333'}}>
          <button
              className="btn btn-warning"
              onClick={this.backToForm}
              type="button">
            <span className="glyphicon glyphicon-menu-right"></span>
            <span>&nbsp;&nbsp;Skip trailer chooser</span>
          </button>
        </div>
      </div>
    )
  },

  chooseTrailer: function(videoId) {
    this.props.chooseTrailer(videoId)
  },

  playTrailer: function (videoId) {
    this.props.playTrailer(videoId)
  },

  backToForm: function () {
    this.props.backToForm()
  },

  searchYoutubeTrailer: function () {
    var self = this
    var movieTitle = this.props.movieTitle

    youtubeService.searchTrailers(movieTitle, function (err, trailers) {
      if (err) {
        console.error('Error on youtube service')
        console.error(err)
      }
      else {
        trailers = JSON.parse(trailers)

        var trailersItems = trailers.items
        var movieTrailers = []
        for (var i = 0; i < trailersItems.length; i++) {
          var trailerJson = trailersItems[i]
          movieTrailers.push({
            videoId: trailerJson.id.videoId,
            videoTitle: trailerJson.snippet.title,
            videoDesc: trailerJson.snippet.description,
            videoImgUrl: trailerJson.snippet.thumbnails.high.url
          })
        }

        self.setState({
          youtubeTrailers: movieTrailers,
        })
      }
    })
  },

})

module.exports = TrailerChooser