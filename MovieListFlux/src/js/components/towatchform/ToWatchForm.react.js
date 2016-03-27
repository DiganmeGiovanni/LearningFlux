
var React = require('react')

var ToWatchActions = require('../../actions/ToWatchActions')
var FormAddMovie   = require('./FormAddMovie.react')
var TrailerChooser = require('./TrailerChooser.react')
var TrailerViewer  = require('./TrailerViewer.react')
var SearchTMDb     = require('./SearchTMDb.react')

/******************************************************************************/

var ToWatchForm = React.createClass({

  getInitialState() {
    return {
      movie: {
        tmdbId: '',
        title: '',
        synopsis: '',
        trailerId: '',
        posterPath: '',
        releaseDate: '',
        voteAverage: '',
        genres: [],
        directors: [],
        addedByEmail: '',
        addedByName: '',
        addedAt: '',
        isWatched: false,
        isActive: true
      },

      displaying: 'movie-search'
    }
  },

  render: function () {
    var contentJSX = ""
    if (this.state.displaying === 'movie-search') {
      contentJSX = (
        <SearchTMDb chooseMovie={this.chooseMovie} />
      )
    }
    if (this.state.displaying === 'movie-form') {
      contentJSX = (
        <FormAddMovie
          cancel={this.cancel}
          searchYoutubeTrailer={this.searchYoutubeTrailer}
          movie={this.state.movie} />
      )
    }
    else if(this.state.displaying === 'trailer-chooser') {
      contentJSX = (
        <TrailerChooser
          movieTitle={this.state.movie.title}
          backToForm={this.showMovieForm}
          chooseTrailer={this.chooseTrailer}
          playTrailer={this.playTrailer} />
      )
    }
    else if(this.state.displaying === 'trailer-view') {
      contentJSX = (
        <TrailerViewer
          videoId={this.state.movie.trailerId}
          chooseTrailer={this.chooseTrailer}
          movieTitle={this.state.movie.title}
          showTrailersList={this.showTrailersList} />
      )
    }


    return (
      <div id="towatch-form-modal" className="modal fade" role="dialog">
        <div className="modal-dialog modal-responsive" role="document">
          {contentJSX}
        </div>
      </div>
    )
  },

  cancel() {
    this.setState({
      movie: {},
      displaying: 'movie-search'
    })

    $('#towatch-form-modal').modal('hide')
  },

  /**
   * This function is called from SearchTMDb component
   * when a movie has been chosen from the list.
   *
   * So render the movie form with the recovered movie data
   * @param chosenM
   */
  chooseMovie(chosenM) {
    chosenM.trailerId = ''

    this.setState({
      movie: chosenM,
      displaying: 'movie-form'
    })
  },

  /**
   * This function is called from TrailerViewer component
   * when videoId has been yet assigned to movie object, so simply
   * render the movie form again
   */
  chooseTrailer(trailerId) {
    var currMovie = this.state.movie
    currMovie.trailerId = trailerId

    this.setState({
      movie: currMovie,
      displaying: 'movie-form'
    })
  },

  showMovieForm() {
    this.setState({
      displaying: 'movie-form'
    })
  },

  showTrailersList() {
    this.setState({
      displaying: 'trailer-chooser'
    })
  },

  playTrailer: function (trailerId) {
    var currMovie = this.state.movie
    currMovie.trailerId = trailerId

    this.setState({
      movie: currMovie,
      displaying: 'trailer-view'
    })
  },

  searchYoutubeTrailer: function(movie) {
    var currMovie = this.state.movie
    currMovie.title = movie.title
    currMovie.synopsis = movie.synopsis

    this.setState({
      movie: currMovie,
    })

    this.showTrailersList()
  }


})

module.exports = ToWatchForm