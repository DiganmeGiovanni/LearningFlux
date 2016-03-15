
var React = require('react')

var ToWatchActions = require('../../actions/ToWatchActions')

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
          <h4 className="modal-title">Add a movie to the list</h4>
        </div>

        <div className="modal-body">
          {formFieldsJSX}
        </div>

        <div className="modal-footer">

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

  constructsFormFields: function() {

    // Genres labels
    var genresJSX = []
    var genres = this.state.movie.genres
    for(var i=0; i<genres.length; i++) {
      genresJSX.push(
        <h4 key={i}>
          <span className="label label-default no-margin">{genres[i]}</span>
        </h4>
      )
    }

    // Directors labels
    var directorsJSX = []
    var directors = this.state.movie.directors
    for(var i=0; i<directors.length; i++) {
      directorsJSX.push(
        <h4 key={i}>
          <span className="label label-primary no-margin">{directors[i]}</span>
        </h4>
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
                <span>&nbsp;&nbsp;Trailer has been assigned&nbsp;&nbsp;</span>
              </span>
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-default btn-sm"
                onClick={this.searchYoutubeTrailer}
                type="button">
                <span className="glyphicon glyphicon-facetime-video"></span>
                <span>&nbsp;&nbsp;Change</span>
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
                className="btn btn-default"
                onClick={this.searchYoutubeTrailer}
                type="button">
                <span className="glyphicon glyphicon-facetime-video"></span>
                <span>&nbsp;&nbsp;Search from Youtube</span>
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
            <label htmlFor="inp-title">Movie's title</label>
            <p className="lead">
              <mark>
                {this.state.movie.title}
              </mark>
            </p>
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
      ToWatchActions.create(this.state.movie)
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