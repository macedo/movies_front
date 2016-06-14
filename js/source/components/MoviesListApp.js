import React from 'react';
import MovieItem from './MovieItem';
import MovieStore from '../stores/MovieStore';

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
    movieStore.addEventListener(this._onChange.bind(this));
  }

  componentWillUnmount () {
    movieStore.removeEventListener(this._onChange.bind(this));
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
      <ul>
        {movieItems}
      </ul>
    )
  }

  _onChange () {
    this.setState(getStateFromStores());
  }
}

export default MoviesListApp;
