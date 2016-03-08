
var React = require('react')
var youtubeService = require('../../services/youtubeService')

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
            <div className="row">
              <div className="col-xs-12">
                <h4>{trailer.videoTitle}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <img src={trailer.videoImgUrl} alt="Trailer image" height="100" width="150"/>
              </div>
              <div className="col-sm-8"><br/>
                <div className="btn-group">
                  <button
                      className="btn btn-default"
                      onClick={this.chooseTrailer.bind(this, trailer.videoId)}>
                    <span className="glyphicon glyphicon-facetime-video"></span>
                    <span>&nbsp;&nbsp;Choose trailer</span>
                  </button>
                  <button
                      className="btn btn-default"
                      onClick={this.playTrailer.bind(this, trailer.videoId)} >
                    <span className="glyphicon glyphicon-play"></span>
                    <span>&nbsp;&nbsp;Watch trailer</span>
                  </button>
                </div>
                <p className="hidden-xs"><br/>
                  <small>
                    {trailer.videoDesc}
                  </small>
                </p>
              </div>
            </div>
            <hr/>
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
          <h4 className="modal-title">Trailers for movie: {this.props.movieTitle}</h4>
        </div>

        <div className="modal-body no-padding-vertical" style={styleChooser}>
          {trailersJSX}
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