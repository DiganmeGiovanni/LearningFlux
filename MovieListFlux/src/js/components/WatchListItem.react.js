
var React = require('react')
var ToWatchActions   = require('../actions/ToWatchActions')
var ToWatchConstants = require('../constants/toWatchConstants')

var WatchListItem = React.createClass({

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

  render() {
    var toWatch = this.props.toWatch

    // Get details JSX
    var detailsJSX = this.constructDetails()

    // Get trailer player JSX
    var trailerModalJSX = this.constructTrailerModal()

    // Style classes for watch list item
    var watchItemClasses = ""
    if (this.props.displayDetails) {
      watchItemClasses += "card-towatch-item col-xs-12"
    }
    else {
      watchItemClasses += " col-xs-6 col-sm-4 col-md-3 col-lg-2"
    }

    // Styles for watch list item
    var watchItemStyles = {
      marginBottom: '20px',
      marginTop: '10px'
    }

    // Style classes for action buttons
    var actionBtnClasses = "btn btn-default btn-lg btn-dark-trans"

    return (
      <div id={toWatch.idDatastore} className={watchItemClasses} style={watchItemStyles}>
        <div className="row">

          {/*Buttons toolbar for small and up devices*/}
          <div className={this.props.displayDetails ? "hidden-xs col-sm-12" : "hidden"}>
            <div className="btn-toolbar">
              <div className="btn-group pull-right">
                <button
                  className={actionBtnClasses}
                  onClick={this._onToggleDisplayDetails}
                  style={{paddingRight: '0px'}}>
                  <span className="glyphicon glyphicon-remove"></span>
                </button>
              </div>

              <div className="btn-group pull-right">
                <button className={actionBtnClasses}>
                  <span className="glyphicon glyphicon-eye-open"></span>
                </button>
                <button
                  className={actionBtnClasses}
                  onClick={this.playTrailer}>
                  <span className="glyphicon glyphicon-facetime-video"></span>
                </button>
              </div>

              <div className="btn-group pull-right">
                <button className={actionBtnClasses} style={{color: '#e74c3c'}}>
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </div>
          </div>

          {/*Poster image */}
          <div className={this.props.displayDetails ? "col-xs-9 col-sm-4" : "col-xs-12"}>
            <div onClick={this._onToggleDisplayDetails} style={{width: '100%'}}>
              <img
                src={ToWatchConstants.TMDB_API_IMGBASE_SM + toWatch.posterPath}
                alt=""
                width="100%"/>
            </div>
          </div>

          {/* Side vertical top bar for small devices */}
          <div className={this.props.displayDetails ? "col-xs-3 visible-xs-block text-right" : "hidden"}>
              <div className="btn-group-vertical">
                <button
                  className={actionBtnClasses}
                  onClick={this._onToggleDisplayDetails}
                  style={{paddingTop: '0px'}}>
                  <span className="glyphicon glyphicon-remove"></span>
                </button>
              </div>

              <br/><br/>
              <div className="btn-group-vertical">
                <button className={actionBtnClasses}>
                  <span className="glyphicon glyphicon-eye-open"></span>
                </button>
                <button
                  className={actionBtnClasses}
                  onClick={this.playTrailer}>
                  <span className="glyphicon glyphicon-facetime-video"></span>
                </button>
              </div>

              <br/><br/>
              <div className="btn-group-vertical">
                <button className={actionBtnClasses} style={{color: '#e74c3c'}}>
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
          </div>


          {/* Movie details */}
          <div className={this.props.displayDetails ? "col-xs-12 col-sm-8" : "hidden"}>
            {detailsJSX}
          </div>
        </div>

        {trailerModalJSX}
      </div>
    )
  },

  constructDetails() {
    var toWatch = this.props.toWatch

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
    return (
      <div className="row">
        <div className="col-xs-12">
          <br className="visible-xs-block" />
          <p>
            <b style={{fontSize: '1.2em', paddingBottom: '5px'}}>
              <span className="glyphicon glyphicon-film"></span>
              <span>&nbsp;&nbsp;{toWatch.title}</span>
            </b><br/><br/>
            <span>
              <span className="glyphicon glyphicon-calendar"></span>
              <span>&nbsp;&nbsp;{toWatch.releaseDate}</span>
            </span><br/>
            <span>
              <span className="glyphicon glyphicon-star" style={{color: '#e67e22'}}></span>
              <span>&nbsp;&nbsp;{toWatch.voteAverage}</span>
            </span>
          </p>
        </div>
        <div className="col-xs-6">
          <b>Directors:</b><br/>
          {directorsJSX}
        </div>
        <div className="col-xs-6">
          <b>Genres</b><br/>
          {genresJSX}
        </div>
        <div className="col-xs-12"><br/>
          <b>Synopsis</b><br/>
          {synopsisJSX}
        </div>
      </div>
    )
  },

  constructTrailerModal() {
    var idTrailerModal = 'modal-trailer-' + this.props.toWatch.idDatastore
    var trailerContainerId = 'modal-trailer-container-' + this.props.toWatch.idDatastore

    return (
      <div className="modal fade" id={idTrailerModal} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-responsive" role="document">
          <div className="modal-content modal-dark">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{color: 'white'}}>&times;</span>
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
      this.props.displayItemDetails(this.props.toWatch.idDatastore)
    }
    else {
      this.props.displayItemDetails('')
    }
  },

  _onToggleWatched: function () {
    ToWatchActions.toggleWatched(this.props.toWatch)
  },

  _onDestroyClick: function () {
    ToWatchActions.destroy(this.props.toWatch.tmdbId)
  }

})

module.exports = WatchListItem