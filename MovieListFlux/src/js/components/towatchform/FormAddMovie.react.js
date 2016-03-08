
var React = require('react')

var ToWatchActions = require('../../actions/ToWatchActions')

var FormAddMovie = React.createClass({

  constructsFormFields: function() {
    var titleErrorJSX = "";
    if (this.state.showErrorTitle) {
      titleErrorJSX = (
        <p id="inp-title-error" className="alert alert-danger">
          <span>Please type the movie's title</span>
        </p>
      )
    }

    // Genres labels
    var genresJSX = []
    var genres = this.state.genres
    for(var i=0; i<genres.length; i++) {
      genresJSX.push(
        <h4 key={i}>
          <span className="label label-default no-margin">{genres[i]}</span>
        </h4>
      )
    }

    // Directors labels
    var directorsJSX = []
    var directors = this.state.directors
    for(var i=0; i<directors.length; i++) {
      directorsJSX.push(
        <h4 key={i}>
          <span className="label label-primary no-margin">{directors[i]}</span>
        </h4>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <label htmlFor="inp-title">Movie's title</label>
            <input
              className="form-control"
              id="inp-title"
              placeholder="Movie's title"
              type="text"
              defaultValue={this.props.movie.title}
            />
            {titleErrorJSX}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-sm-6 hidden-overflow"><br/>
            <label htmlFor="inp-director">Movie's directors</label><br/>
            {directorsJSX}
          </div>

          <div className="col-xs-6 col-sm-6 hidden-overflow"><br/>
            <label htmlFor="inp-genre">Movie's genres</label><br/>
            {genresJSX}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12"><br/>
            <label htmlFor="inp-synopsis">Movie's Synopsis</label>
            <textarea
              className="form-control"
              id="inp-synopsis"
              placeholder="Synopsis"
              rows="4"
              defaultValue={this.props.movie.synopsis}
            />
          </div>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {
      genres: this.props.movie.genres,
      directors: this.props.movie.directors
    }
  },

  render() {
    var formFieldsJSX = this.constructsFormFields()

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">Add a movie to the list</h4>
        </div>

        <div className="modal-body">
          {formFieldsJSX}
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-danger pull-left"
            onClick={this.searchYoutubeTrailer}
            type="button">

            <span>Trailer</span>
          </button>

          <button
            className="btn btn-default"
            onClick={this.cancel}
            type="button">Cancel</button>
          <button
            className="btn btn-default"
            onClick={this.save}>
            <span>Save</span>
          </button>
        </div>
      </div>
    )
  },

  recoverMovieFromForm() {
    var title = $('#inp-title').val()
    var synopsis = $('#inp-synopsis').val()

    return {
      title: title,
      synopsis: synopsis,
    }
  },

  save() {
    if (this.validateForm()) {
      var title = $('#inp-title').val()
      var synopsis = $('#inp-synopsis').val()

      ToWatchActions.create(title, director, genre, this.props.movie.trailerId, synopsis)
      $('#towatch-form-modal').modal('hide')
    }
  },

  cancel() {
    this.props.cancel()
  },

  searchYoutubeTrailer() {
    if (this.validateForm()) {
      var movie = this.recoverMovieFromForm()
      movie.genres = this.state.genres
      movie.directors = this.state.directors

      this.props.searchYoutubeTrailer(movie)
    }
  },

  validateForm: function () {
    var isFormOk = true;

    var title = $('#inp-title').val()
    if (title && title.length > 1) {
      this.setState({
        showErrorTitle: false
      })
    }
    else {
      this.setState({
        showErrorTitle: true
      })
      isFormOk = false
    }

    return isFormOk
  },

})

module.exports = FormAddMovie