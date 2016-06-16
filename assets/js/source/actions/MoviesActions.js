import AppDispatcher from '../dispatcher/AppDispatcher';

export function createMovieAction(movie) {
  AppDispatcher.dispatch({
    type: 'CREATE_MOVIE',
    data: movie
  });
}

export function deleteMovieAction(id) {
  AppDispatcher.dispatch({
    type: 'DELETE_MOVIE',
    data: id
  });
}

export function receiveAllMoviesAction(movies) {
  AppDispatcher.dispatch({
    type: 'RECEIVE_MOVIES',
    data: movies
  });
}

export function updateMovieAction(movie) {
  AppDispatcher.dispatch({
    type: 'UPDATE_MOVIE',
    data: movie
  });
}
