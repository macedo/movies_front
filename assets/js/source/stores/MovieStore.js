import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieConstants from '../constants/MovieConstants';
import { updateMovie } from '../utils/MoviesWebAPIUtils';

const CHANGE_EVENT = 'change'
let _movies = {};

function _addMovie(movie) {
  _movies[movie.id] = movie.attributes;
}

function _addMovies(movies) {
  movies.forEach((movie) => {
    _addMovie(movie);
  });
}

function _removeMovie(id) {
  delete _movies[id];
}

function _updateMovie(movie) {
  _movies[movie.id] = movie.attributes; 
}

class MovieStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.register();
  }

  addChangeEventListener (callback) {
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
        case 'CREATE_MOVIE':
          _addMovie(payload.data);
          this.emitChange();
          break;
        case 'DELETE_MOVIE':
          _removeMovie(payload.data);
          this.emitChange();
          break;
        case 'RECEIVE_MOVIES':
          _addMovies(payload.data);
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

  removeChangeEventListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default MovieStore;
