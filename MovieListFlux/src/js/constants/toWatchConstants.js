
module.exports = {

  //
  // To watch actions names
  //
  TOWATCH_FETCH_ALL: "towatch-fetch-allmovies",
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
  // user in-memory data
  //
  user_data: {
    firstName: '',
    lastName: '',
    email: ''
  }
}