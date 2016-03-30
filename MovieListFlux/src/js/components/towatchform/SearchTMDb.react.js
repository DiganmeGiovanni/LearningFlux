
var React = require('react')
var moment = require('moment')

var tmdbService = require('../../services/tmdbService')
var ToWatchConstants = require('../../constants/toWatchConstants')

/******************************************************************************/

var SearchTMDb = React.createClass({

  getInitialState() {
    return {
      searchResults: []
    }
  },

  constructsResultsList() {
    var resultsJSX = []
    var searchResults = this.state.searchResults
    var overViewStyle = {
      maxHeight: '60px',
      overflow: 'hidden'
    }

    for(var i=0; i<searchResults.length; i++) {
      var result = searchResults[i]
      var imageSrc = "./src/img/movie-icon.jpg"
      if (result.posterPath && result.posterPath.length > 0) {
        imageSrc = ToWatchConstants.TMDB_API_IMGBASE_SM + result.posterPath
      }
      var releaseDate = moment(result.releaseDate).format('YYYY, MMMM Do')

      resultsJSX.push(
        <div key={result.tmdbId} className="row">
          <div className="col-xs-12">
            <div className="card-result">
              <div className="row">
                <div className="col-xs-4 col-sm-3">
                  <img
                    src={imageSrc}
                    alt="Movie poster"
                    className="movie-search-result-card-image" />
                </div>
                <div className="col-xs-8 col-sm-9 movie-search-result-card-content">
                  <h4>{result.title}</h4>
                  <p>
                    <span>
                      <span className="glyphicon glyphicon-calendar"></span>
                      <span>&nbsp;&nbsp;{releaseDate}</span>
                    </span><br/>
                    <span>
                      <span className="glyphicon glyphicon-star" style={{color: '#e67e22'}}></span>
                      <span>&nbsp;&nbsp;{result.voteAverage}</span>
                    </span>
                  </p>

                  <p style={overViewStyle} className="hidden-xs">
                      {result.synopsis}
                  </p>

                  <div className="text-right card-result-bottom-buttons">
                    <button
                        className="btn btn-default"
                        onClick={this.chooseMovie.bind(null, i)}>
                      <span className="glyphicon glyphicon-film"></span>
                      <span>&nbsp;&nbsp;Add movie</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return resultsJSX
  },

  render() {
    var resultsJSX = this.constructsResultsList()
    var resultsViewerStyle = {
      maxHeight: '400px',
      paddingTop: '20px',
      overflow: 'auto'
    }

    var searchBoxStyle = {
      paddingBottom: '20px',
      borderBottom: '2px solid #AAA'
    }

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">Add movie</h4>
        </div>

        <div className="modal-body">
          <div className="row">
            <div className="col-xs-12" style={searchBoxStyle}>
              <label htmlFor="">Movie's title</label>
              <input
                id="inp-movie-title"
                className="form-control"
                onKeyUp={this.searchMovies}
                placeholder="Type to search your movie"
                type="text" />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12" style={resultsViewerStyle}>
              {resultsJSX}
            </div>
          </div>
        </div>
      </div>
    )
  },

  chooseMovie: function(index) {
    var self = this
    var selectedMovie = this.state.searchResults[index]
    tmdbService.fetchMovieDetails(selectedMovie.tmdbId, function (err, body) {
      if (err) {
        console.error("Error fetching movie details from TMDb")
        console.error(err)
      }
      else {
        body = JSON.parse(body)
        var genres = []
        for(var i=0; i<body.genres.length; i++) {
          genres.push(body.genres[i].name)
        }

        var directors = []
        for(var i=0; i<body.credits.crew.length; i++) {
          var currCrew = body.credits.crew[i]
          if (currCrew.job === 'Director') {
            directors.push(currCrew.name)
          }
        }

        selectedMovie.genres = genres
        selectedMovie.directors = directors
        self.props.chooseMovie(selectedMovie)
      }
    })
  },

  searchMovies() {
    var self = this
    var qryTerm = document.getElementById('inp-movie-title').value
    if(qryTerm.trim().length >= 2) {
      tmdbService.searchMovie(qryTerm, function (err, body) {
        if (err) {
          console.error('Error fetching from tmdb')
          console.error(err)
        }
        else {
          body = JSON.parse(body)
          var rawResults = body.results
          var results = []
          for (var i=0; i<rawResults.length; i++) {
            results.push({
              tmdbId: rawResults[i].id,
              title: rawResults[i].title,
              synopsis: rawResults[i].overview,
              posterPath: rawResults[i].poster_path,
              releaseDate: rawResults[i].release_date,
              voteAverage: rawResults[i].vote_average
            })
          }

          self.setState({
            searchResults: results
          })
        }
      })
    }
  }

})

module.exports = SearchTMDb