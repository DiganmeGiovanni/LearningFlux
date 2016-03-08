
var React = require('react')

var ToWatchActions = require('../../actions/ToWatchActions')
var FormAddMovie   = require('./FormAddMovie.react')
var TrailerChooser = require('./TrailerChooser.react')
var TrailerViewer  = require('./TrailerViewer.react')

var ToWatchForm = React.createClass({

  getInitialState() {
    return {
      movie: {
        title: '',
        genre: '',
        director: '',
        synopsis: '',
        trailerId: ''
      },
      displaying: 'movie-form'
    }
  },

  render: function () {
    var contentJSX = ""
    if (this.state.displaying === 'movie-form') {
      contentJSX = (
        <FormAddMovie searchYoutubeTrailer={this.searchYoutubeTrailer} movie={this.state.movie} />
      )
    }
    else if(this.state.displaying === 'trailer-chooser') {
      contentJSX = (
        <TrailerChooser
          movieTitle={this.state.movie.title}
          chooseTrailer={this.chooseTrailer}
          playTrailer={this.playTrailer} />
      )
    }
    else if(this.state.displaying === 'trailer-view') {
      contentJSX = (
        <TrailerViewer
          videoId={this.state.movie.trailerId}
          chooseTrailer={this.chooseTrailer}
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
    this.setState({
      movie: {
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        synopsis: movie.synopsis
      },
    })

    this.showTrailersList()
  }


})

module.exports = ToWatchForm