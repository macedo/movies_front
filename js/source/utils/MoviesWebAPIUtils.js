import request from 'superagent';
import superagentPromisePlugin  from 'superagent-promise-plugin';
import { createMovieAction, deleteMovieAction, receiveAllMoviesAction, updateMovieAction } from '../actions/MoviesActions';

export function createMovie(data) {
  request
    .post('http://localhost:4000/api/movies')
    .send(data)
    .set('Content-Type', 'application/vnd.api+json')
    .use(superagentPromisePlugin)
    .then((response) => {
      createMovieAction(response.body.data);
    });
}

export function deleteMovie(id) {
  request
    .delete(`http://localhost:4000/api/movies/${id}`)
    .set('Content-Type', 'application/vnd.api+json')
    .use(superagentPromisePlugin)
    .then((response) => {
      deleteMovieAction(id);
    });
}

export function getAllMovies() {
  request
    .get('http://localhost:4000/api/movies')
    .set('Content-Type', 'application/vnd.api+json')
    .use(superagentPromisePlugin)
    .then((response) => {
      receiveAllMoviesAction(response.body.data);
    });
}

export function updateMovie(id, data) {
  request
    .patch(`http://localhost:4000/api/movies/${id}`)
    .send(data)
    .set('Content-Type', 'application/vnd.api+json')
    .use(superagentPromisePlugin)
    .then((response) => {
      updateMovieAction(response.body.data);
    });
}
