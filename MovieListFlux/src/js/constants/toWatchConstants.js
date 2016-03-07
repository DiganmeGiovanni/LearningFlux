
module.exports = {

  //
  // To watch actions names
  //
  TOWATCH_CREATE: "towatch-create",
  TOWATCH_DESTROY: "towatch-destroy",
  TOWATCH_DESTROY_COMPLETED: "towatch-destroy-completed",
  TOWATCH_MARK_AS_SEEN: "towatch-mark-as-seen",
  TOWATCH_MARK_AS_NOTSEEN: "towatch-mark-as-notseen",
  TOWATCH_UPDATE: "towatch-update",

  //
  // Login actions names
  //
  USER_LOGIN: "user_login",
  USER_LOGOUT: "user-logout",

  //
  // API Info
  //
  API_URL: "http://localhost:8080/api/moviestowatch/", // TODO Replace with online api

  //
  // Google APIs urls
  //
  GO_YTB_API_KEY: 'AIzaSyACtAHkPMNOT8nIbqyfKPnhfdA8YmY5HW0',
  GO_YTB_API_URL_SEARCH: 'https://www.googleapis.com/youtube/v3/search',

  //
  // user in-memory data
  //
  user_data: {
    firstName: '',
    lastName: '',
    email: ''
  }
}