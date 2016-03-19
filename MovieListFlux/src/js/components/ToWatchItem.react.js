
var React = require('react')

var ToWatchActions   = require('../actions/ToWatchActions')
var ToWatchConstants = require('../constants/toWatchConstants')

/*****************************************************************************/

var ToWatchItem = React.createClass({

  getInitialState() {
    return {
      playingTrailer: false
    }
  },

  componentDidUpdate() {
    if(this.state.playingTrailer) {
      var trailerContainerId = 'modal-trailer-container-' + this.props.toWatch.idDatastore
      new YT.Player(trailerContainerId, {
        width: '100%',
        videoId: this.props.toWatch.trailerId,
        events: {
          'onReady': function (event) {
            event.target.playVideo()
          }
        }
      })
    }

    if(this.props.displayDetails) {
      document.getElementById(this.props.toWatch.idDatastore + "").scrollIntoView()
    }
  },

  render: function () {
    var toWatch = this.props.toWatch

    // JSX Form movie trailer modal
    var trailerModalJSX = this.constructTrailerModal()

    // Title of movie (Watched?)
    var titleJSX = toWatch.title
    if (toWatch.isWatched) {
      titleJSX = (
        <span>
          <span className="glyphicon glyphicon-eye-open"></span>
          &nbsp;&nbsp;&nbsp;
          <del>{toWatch.title}</del>
        </span>
      )
    }

    // Styles for directors and genres labels
    var styleLabel = {
      display: 'inline-block',
      marginBottom: '5px',
      marginRight: '5px'
    }

    // Directors JSX
    var dirs = toWatch.directors
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
    var genres = toWatch.genres
    var genresJSX = []
    for (var i=0; i<genres.length; i++) {
      genresJSX.push(
        <span key={i} style={styleLabel}>
          <span className="label label-default">{genres[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    // Synopsis JSX
    var synopsisJSX = (
      <p>
          {toWatch.synopsis}
      </p>
    )

    // Joining details in a single node
    var detailsJSX = (
      <div className="row">
        <div className="col-xs-6"><br/>
          <b>Directors:</b><br/>
          {directorsJSX}
        </div>
        <div className="col-xs-6"><br/>
          <b>Genres</b><br/>
          {genresJSX}
        </div>
        <div className="col-xs-12"><br/>
          <b>Synopsis</b><br/>
          {synopsisJSX}
        </div>
      </div>
    )

    // Styles for movie container
    var itemStyleClass = "col-xs-12"
    if (toWatch.isWatched) {
      itemStyleClass += " disabled"
    }
    if (this.props.displayDetails) {
      itemStyleClass += " col-sm-12 col-lg-8"
    }
    else {
      itemStyleClass += " col-sm-6 col-lg-4"
    }

    return (
      <div id={toWatch.idDatastore} className={itemStyleClass} style={{padding: '12px'}}>
        <div className="card-towatch-item">

          <div className="row">
            <div className="col-xs-4 no-padding-right">
              <img src={ToWatchConstants.TMDB_API_IMGBASE_LG + toWatch.posterPath} alt="" width="100%"/>
            </div>

            <div className="col-xs-8">
              <div className="row">
                <div className="col-xs-12">
                  <h4>{titleJSX}</h4>
                </div>
              </div>
              <div className="row">

                {/* Movie brief details */}
                <div className="col-xs-12">
                  <p>
                    <span>
                      <span className="glyphicon glyphicon-calendar"></span>
                      <span>&nbsp;&nbsp;{toWatch.releaseDate}</span>
                    </span><br/>
                    <span>
                      <span className="glyphicon glyphicon-star"></span>
                      <span>&nbsp;&nbsp;{toWatch.voteAverage}</span>
                    </span>
                  </p>
                </div>

                {/* Movie toolbar */}
                <div className="col-xs-12 text-right">
                  <div className="btn-toolbar">
                    <div className="btn-group">
                      <button className={toWatch.isWatched ? "btn btn-default active" : "btn btn-default"}>
                        <span className="glyphicon glyphicon-eye-open"></span>
                      </button>
                      <button
                        className={this.props.displayDetails ? "btn btn-default active" : "btn btn-default"}
                        onClick={this._onToggleDisplayDetails}>
                        <span className="glyphicon glyphicon-list-alt"></span>
                      </button>
                      <button
                          className="btn btn-default"
                          onClick={this.playTrailer}>
                        <span className="glyphicon glyphicon-facetime-video"></span>
                      </button>
                      <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        <span className="glyphicon glyphicon-option-horizontal"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a href="#">
                            <span className="glyphicon glyphicon-pencil"></span>
                            <span>&nbsp;&nbsp;Edit</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="glyphicon glyphicon-trash"></span>
                            <span>&nbsp;&nbsp;Delete</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Movie details */}
                <div className={this.props.displayDetails ? "hidden-xs col-xs-12" : "hidden"}>
                  {detailsJSX}
                </div>
              </div>
            </div>
          </div>

          {/* Movie details for small devices */}
          <div className={this.props.displayDetails ? "visible-xs-block row" : "hidden"}>
            <div className="col-xs-12" style={{padding: '0px 30px 0px 30px'}}>
              {detailsJSX}
            </div>
          </div>
        </div>

        {trailerModalJSX}
      </div>
    )
  },

  constructTrailerModal() {
    var idTrailerModal = 'modal-trailer-' + this.props.toWatch.idDatastore
    var trailerContainerId = 'modal-trailer-container-' + this.props.toWatch.idDatastore

    return (
      <div className="modal fade" id={idTrailerModal} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.toWatch.title}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <div id={trailerContainerId}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  playTrailer() {
    var idTrailerModal = 'modal-trailer-' + this.props.toWatch.idDatastore
    $('#' + idTrailerModal).modal('show')

    this.setState({
      playingTrailer: true
    })
  },

  _onToggleDisplayDetails: function () {
    if(!this.props.displayDetails) {
      this.props.displayNoWatchedDetails(this.props.toWatch.idDatastore)
    }
    else {
      this.props.displayNoWatchedDetails('')
    }
  },

  _onToggleWatched: function () {
    ToWatchActions.toggleWatched(this.props.toWatch)
  },

  _onDestroyClick: function () {
    ToWatchActions.destroy(this.props.toWatch.tmdbId)
  }

})

module.exports = ToWatchItem