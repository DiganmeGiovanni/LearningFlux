
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

    var genreErrorJSX = "";
    if (this.state.showErrorGenre) {
      genreErrorJSX = (
        <p id="inp-genre-error" className="alert alert-danger">
          <span>Please choose a genre</span>
        </p>
      )
    }

    var directorErrorJSX = "";
    if (this.state.showErrorDirector) {
      directorErrorJSX = (
        <p id="inp-title-error" className="alert alert-danger">
          <span>Please type the director's name</span>
        </p>
      )
    }

    var synopsisErrorJSX = "";
    if (this.state.showErrorSynopsis) {
      synopsisErrorJSX = (
        <p id="inp-title-error" className="alert alert-danger">
          <span>Please type a little synopsis</span>
        </p>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-6"><br/>
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

          <div className="col-sm-12 col-md-6"><br/>
            <label htmlFor="inp-genre">Movie's genre</label>
            <select name="inp-genre" id="inp-genre" className="form-control" defaultValue={this.props.movie.genre}>
              <option value="Action"    >Action</option>
              <option value="Adventure" >Adventure</option>
              <option value="Animation" >Animation</option>
              <option value="Biography" >Biography</option>
              <option value="Comedy"    >Comedy</option>
              <option value="Crime"     >Crime</option>
              <option value="Documentary">Documentary</option>
              <option value="Drama"     >Drama</option>
              <option value="Family"    >Family</option>
              <option value="Fantasy"   >Fantasy</option>
              <option value="Film-Noir" >Film-Noir</option>
              <option value="History"   >History</option>
              <option value="Horror"    >Horror</option>
              <option value="Music"     >Music</option>
              <option value="Musical"   >Musical</option>
              <option value="Mystery"   >Mystery</option>
              <option value="Romance"   >Romance</option>
              <option value="Sci-Fi"    >Sci-Fi</option>
              <option value="Sport"     >Sport</option>
              <option value="Thriller"  >Thriller</option>
              <option value="War"       >War</option>
              <option value="Western"   >Western</option>
            </select>
            {genreErrorJSX}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6"><br/>
            <label htmlFor="inp-director">Movie's director</label>
            <input
              className="form-control"
              id="inp-director"
              placeholder="Movie's director"
              type="text"
              defaultValue={this.props.movie.director}
            />
            {directorErrorJSX}
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
            {synopsisErrorJSX}
          </div>
        </div>
      </div>
    )
  },

  getInitialState() {
    return {

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
            className="btn btn-danger"
            onClick={this.searchYoutubeTrailer}
            type="button">
            <span>Add trailer from Youtube</span>
          </button>
          <button
            className="btn btn-success"
            onClick={this.save}>
            <span>Add movie</span>
          </button>
        </div>
      </div>
    )
  },

  recoverMovieFromForm() {
    var title = $('#inp-title').val()
    var director = $('#inp-director').val()
    var genre = $('#inp-genre').val()
    var synopsis = $('#inp-synopsis').val()

    return {
      title: title,
      genre: genre,
      director: director,
      synopsis: synopsis
    }
  },

  save() {
    if (this.validateForm()) {
      var title = $('#inp-title').val()
      var director = $('#inp-director').val()
      var genre = $('#inp-genre').val()
      var synopsis = $('#inp-synopsis').val()

      ToWatchActions.create(title, director, genre, this.props.movie.trailerId, synopsis)
      $('#towatch-form-modal').modal('hide')
    }
  },

  searchYoutubeTrailer() {
    if (this.validateForm()) {
      var movie = this.recoverMovieFromForm()
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

    var genre = $('#inp-genre').val()
    if (genre && genre.length > 1) {
      this.setState({
        showErrorGenre: false
      })
    }
    else {
      this.setState({
        showErrorGenre: true
      })
      isFormOk = false
    }

    return isFormOk
  },

})

module.exports = FormAddMovie