
var React = require('react')

var ToWatchActions = require('../../actions/ToWatchActions')

/******************************************************************************/

var FormAddMovie = React.createClass({

  getInitialState: function () {
    var movie = this.props.movie
    return {
      movie: movie
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
          <h4 className="modal-title">Add movie to list</h4>
        </div>

        <div className="modal-body">
          {formFieldsJSX}
        </div>

        <div className="modal-footer">

          <button
            className="btn btn-danger"
            onClick={this.cancel}
            type="button">
            <span className="glyphicon glyphicon-remove-circle"></span>
            <span>&nbsp;&nbsp;Cancel</span>
          </button>
          <button
            className="btn btn-success"
            onClick={this.save}>
            <span className="glyphicon glyphicon-film"></span>
            <span>&nbsp;&nbsp;&nbsp;Save</span>
          </button>
        </div>
      </div>
    )
  },

  constructsFormFields: function() {

    // Styles for directors and genres labels
    var styleLabel = {
      display: 'inline-block',
      marginBottom: '10px',
      marginRight: '5px'
    }

    // Directors JSX
    var dirs = this.state.movie.directors
    var directorsJSX = []
    for (var i=0; i<dirs.length; i++) {
      directorsJSX.push(
        <span key={i} style={styleLabel}>
          <span className="label label-primary">{dirs[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    // Genres JSX
    var genres = this.state.movie.genres
    var genresJSX = []
    for (var i=0; i<genres.length; i++) {
      genresJSX.push(
        <span key={i} style={styleLabel}>
          <span className="label label-default">{genres[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    // Yet has trailer assigned?
    var trailerJXS = ""
    if (this.state.movie.trailerId && this.state.movie.trailerId.length > 0) {
      trailerJXS = (
        <div className="row">
          <div className="col-xs-12"><br/>
            <label htmlFor="">Movie's trailer</label><br/>
            <div>
              <span htmlFor="" className="label label-success">
                <span className="glyphicon glyphicon-ok"></span>
                <span>&nbsp;&nbsp;&nbsp;Trailer has been assigned&nbsp;&nbsp;</span>
              </span>
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-danger"
                onClick={this.searchYoutubeTrailer}
                type="button"
                style={{background: '#e52d27'}}>
                <span className="glyphicon glyphicon-facetime-video"></span>
                <span>&nbsp;&nbsp;&nbsp;Change</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
    else {
      trailerJXS = (
        <div className="row">
          <div className="col-xs-12"><br/>
            <label htmlFor="">Movie's trailer</label><br/>
            <div>
              <button
                className="btn btn-danger"
                onClick={this.searchYoutubeTrailer}
                type="button"
                style={{background: '#e52d27'}}>
                <span className="glyphicon glyphicon-facetime-video"></span>
                <span>&nbsp;&nbsp;&nbsp;Search from Youtube</span>
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <label>Movie's title</label>
            <p className="lead">
              {this.state.movie.title}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-sm-6 hidden-overflow"><br/>
            <label>Movie's directors</label><br/>
            {directorsJSX}
          </div>

          <div className="col-xs-6 col-sm-6 hidden-overflow"><br/>
            <label>Movie's genres</label><br/>
            {genresJSX}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12"><br/>
            <label>Movie's Synopsis</label>
            <p>
              {this.state.movie.synopsis}
            </p>
          </div>
        </div>

        {trailerJXS}
      </div>
    )
  },

  save() {
    if (this.validateForm()) {
      ToWatchActions.addMovieToCurrentList(this.state.movie)
      this.props.cancel()
    }
  },

  cancel() {
    this.props.cancel()
  },

  searchYoutubeTrailer() {
    if (this.validateForm()) {
      this.props.searchYoutubeTrailer(this.state.movie)
    }
  },

  validateForm: function () {

    // Just now there is nothing to validate,
    // but method stills here for future possible implementations
    // of custom user edits
    return true
  },

})

module.exports = FormAddMovie