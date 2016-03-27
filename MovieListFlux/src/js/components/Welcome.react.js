
var React        = require('react')
var LoginActions = require('../actions/LoginActions')

var Welcome = React.createClass({

  componentDidMount: function () {
    this.renderGoogleSigninButton()
  },

  renderGoogleSigninButton: function () {
    gapi.signin2.render('g-signin2-custom', {
      'scope': 'profile email',
      'width': '240',
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': function (googleUser) {

        var profile = googleUser.getBasicProfile()
        var email = profile.getEmail()
        var name  = profile.getName()

        LoginActions.loginUser(name, email)
      },
      'onfailure': function (error) {
        console.error("Error callback")
        LoginActions.logoutUser()
      }
    });
  },

  render: function () {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="col-xs-12">
            <h1>Watchlist</h1>
          </div>
          <div className="col-xs-12">
            <h3>Track all the movies that you wish to see</h3>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-xs-12"><br/><br/>
            <span>Create multiple lists | Share with friends</span>
          </div>
        </div>

        <div className="row"><br/><br/>
          <div className="col-xs-12 col-sm-4 col-sm-offset-4">
            <div id="g-signin2-custom" className="g-signin2-custom" style={{margin: 'auto'}}></div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Welcome
