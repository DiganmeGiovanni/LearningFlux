
var React        = require('react')
var LoginActions = require('../actions/LoginActions')

var Welcome = React.createClass({

  componentDidMount: function () {
    this.renderGoogleSigninButton()
  },

  renderGoogleSigninButton: function () {
    gapi.signin2.render('g-signin2-custom', {
      'scope': 'profile email',
      'width': '50%',
      'height': 50,
      'theme': 'light',
      'onsuccess': function (googleUser) {

        var profile = googleUser.getBasicProfile()
        var email = profile.getEmail()
        var name  = profile.getName()

        LoginActions.loginUser(name, '', email)
      },
      'onfailure': function (error) {
        console.error("Error callback")
        LoginActions.logoutUser()
      }
    });
  },

  render: function () {
    return (
      <div>
        <div className="row"><br/><br/>
          <div className="col-sm-offset-6 text-center">
            <div id="g-signin2-custom" className="g-signin2-custom"></div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Welcome
