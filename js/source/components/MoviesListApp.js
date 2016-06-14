import React from 'react';
import MovieItem from './MovieItem';
import MovieStore from '../stores/MovieStore';
import { createMovie } from '../utils/MoviesWebAPIUtils';

const movieStore = new MovieStore();

function getStateFromStores() {
  return {
    movies: movieStore.getAllMovies()
  };
}

class MoviesListApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = getStateFromStores()
  }

  componentDidMount () {
    movieStore.addChangeEventListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    movieStore.removeChangeEventListener(this._onChange.bind(this));
  }

  _onSubmitForm (event) {
    event.preventDefault();
    const input = event.target.firstChild;
    createMovie({ movie: { name: input.value } });
  }

  render () {
    const movieItems = this.state.movies.map((movie) => {
      return (
        <MovieItem
          key={movie.id}
          movie={movie}
        />
      );
    });

    return (
      <div>
        <form onSubmit={this._onSubmitForm.bind(this)}>
          <input type="text" />
        </form>
        <ul>
          {movieItems}
        </ul>
      </div>
    )
  }

  _onChange () {
    this.setState(getStateFromStores());
  }
}

export default MoviesListApp;
