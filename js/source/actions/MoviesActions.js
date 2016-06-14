import AppDispatcher from '../dispatcher/AppDispatcher';

export function createMovieAction(movie) {
  AppDispatcher.dispatch({
    type: 'CREATE_MOVIE',
    data: movie
  });
}

export function receiveAllMoviesAction(data) {
  AppDispatcher.dispatch({
    type: 'RECEIVE_MOVIES',
    data: data
  });
}

export function updateMovieAction(movie) {
  AppDispatcher.dispatch({
    type: 'UPDATE_MOVIE',
    data: movie
  });
}
