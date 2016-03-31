
module.exports = {

  //
  // To watch actions names
  //
  TOWATCH_FETCH_ALL: "towatch-fetch-allmovies",
  TOWATCH_FETCH_LIST: "towatch-fetch-list",
  TOWATCH_FETCH_LISTS_WITHOUT_CONTENTS: "towatch-fetch-lists-nocontents",
  TOWATCH_ADD_TO_CURR_LIST: "towatch-addMovieToCurrentList",
  TOWATCH_DESTROY: "towatch-destroy",
  TOWATCH_DESTROY_COMPLETED: "towatch-destroy-completed",
  TOWATCH_MARK_AS_SEEN: "towatch-mark-as-seen",
  TOWATCH_MARK_AS_NOTSEEN: "towatch-mark-as-notseen",
  TOWATCH_SHARE_CURR_LIST: "towatch-share-curr-list",
  TOWATCH_UPDATE: "towatch-update",

  TOWATCH_CREATE_LIST: "towatch-create-list",
  TOWATCH_DELETE_CURR_LIST: "towatch_delete_curr_list",


  //
  // User actions names
  //
  USER_LOGIN: "user_login",
  USER_LOGOUT: "user-logout",
  USER_UPLOAD_PREFERENCES: "user_upload_preferences",

  //
  // API Info
  //
  API_URL: "http://localhost:8080/api/", // TODO Replace with online api
  //API_URL: "http://movies-to-watch.appspot.com/api/",

  //
  // Google APIs urls
  //
  GO_YTB_API_KEY: 'AIzaSyACtAHkPMNOT8nIbqyfKPnhfdA8YmY5HW0',
  GO_YTB_API_URL_SEARCH: 'https://www.googleapis.com/youtube/v3/search',

  //
  // The movie database API info
  //
  TMDB_API_KEY: 'b05e87f356ef223c5aeacf0bcae54d04',
  TMDB_API_SEARCH_MOVIE: 'http://api.themoviedb.org./3/search/movie',
  TMDB_API_MOVIE_DETAILS: 'http://api.themoviedb.org./3/movie/',         // + modieId?append_response
  TMDB_API_IMGBASE_SM: 'http://image.tmdb.org/t/p/w300',
  TMDB_API_IMGBASE_MD: 'http://image.tmdb.org/t/p/w780',
  TMDB_API_IMGBASE_LG: 'http://image.tmdb.org/t/p/w1280',
  TMDB_API_IMGBASE_OR: 'http://image.tmdb.org/t/p/original',

  //
  // user in-memory data (Taken from backend JSON response on user login
  //
  userData: {
    name: '',
    email: ''
  }
}
