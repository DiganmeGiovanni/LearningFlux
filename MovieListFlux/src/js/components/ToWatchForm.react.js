
var React = require('react')
var ToWatchActions = require('../actions/ToWatchActions')

/*****************************************************************************/

var ToWatchForm = React.createClass({

  getInitialState: function () {
    return {
      showErrorTitle: false,
      showErrorGenre: false,
      showErrorDirector: false,
      showErrorSynopsis: false
    }
  },

  render: function () {

    var titleErrorJSX = "";
    if (this.state.showErrorTitle) {
      titleErrorJSX = (
        <p id="inp-title-error" className="alert alert-danger">
          <span>Please type a title for the movie</span>
        </p>
      )
    }

    var genreErrorJSX = "";
    if (this.state.showErrorGenre) {
      genreErrorJSX = (
        <p id="inp-genre-error" className="alert alert-danger">
          <span>Please type a genre for the movie</span>
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
      <div id="towatch-form-modal" className="modal fade" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Add a movie to the list</h4>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-sm-12 col-md-6"><br/>
                  <input
                    className="form-control"
                    id="inp-title"
                    placeholder="Movie's title"
                    type="text"
                    defaultValue={this.props.title}
                  />
                  {titleErrorJSX}
                </div>

                <div className="col-sm-12 col-md-6"><br/>
                  <input
                    className="form-control"
                    id="inp-genre"
                    placeholder="Movie's genre"
                    type="text"
                    defaultValue={this.props.genre}
                  />
                  {genreErrorJSX}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6"><br/>
                  <input
                    className="form-control"
                    id="inp-director"
                    placeholder="Movie's director"
                    type="text"
                    defaultValue={this.props.director}
                  />
                  {directorErrorJSX}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12"><br/>
                  <textarea
                    className="form-control"
                    id="inp-synopsis"
                    placeholder="Synopsis"
                    rows="4"
                    defaultValue={this.props.synopsis}
                  />
                  {synopsisErrorJSX}
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={this.save}>Add movie</button>
            </div>
          </div>
        </div>
      </div>
    )
  },

  save: function () {
    if (this.validateForm()) {
      var title = $('#inp-title').val()
      var genre = $('#inp-genre').val()
      var director = $('#inp-director').val()
      var synopsis = $('#inp-synopsis').val()

      ToWatchActions.create(title, genre, director, synopsis)
      $('#towatch-form-modal').modal('hide')
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

    var director = $('#inp-director').val()
    if (director && director.length > 3) {
      this.setState({
        showErrorDirector: false
      })
    }
    else {
      this.setState({
        showErrorDirector: true
      })
      isFormOk = false
    }

    var synopsis = $('#inp-synopsis').val()
    if (synopsis && synopsis.length > 10) {
      this.setState({
        showErrorSynopsis: false
      })
    }
    else {
      this.setState({
        showErrorSynopsis: true
      })
      isFormOk = false
    }

    return isFormOk
  },

})

module.exports = ToWatchForm