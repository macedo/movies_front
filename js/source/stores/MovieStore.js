import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieConstants from '../constants/MovieConstants';
import { updateMovie } from '../utils/MoviesWebAPIUtils';

const CHANGE_EVENT = 'change'
let _movies = {};

function _addMovies(movies) {
  movies.forEach((movie) => {
    _movies[movie.id] = movie.attributes;
  });
}

function _updateMovie(movie) {
  _movies[movie.id] = movie.attributes; 
}

class MovieStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.register();
  }

  addEventListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  emitChange () {
    this.emit(CHANGE_EVENT);
  }

  getAllMovies () {
    let movies = [];
    for (let key in _movies) {
      movies.push(_movies[key]);
    }

    return movies;
  }

  register () {
    this.dispatchToken = AppDispatcher.register((payload) => {
      switch(payload.type) {
        case 'RECEIVE_MOVIES':
          _addMovies(payload.data)
          this.emitChange();
          break;
        case 'UPDATE_MOVIE':
          _updateMovie(payload.data);
          this.emitChange();
          break;
        default:
      }
    });
  }

  removeEventListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default MovieStore;
