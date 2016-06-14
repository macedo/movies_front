import React from 'react';
import ReactDOM from 'react-dom';
import MoviesListApp from './components/MoviesListApp';
import { getAllMovies } from './utils/MoviesWebAPIUtils'

getAllMovies();

ReactDOM.render(
  <MoviesListApp />,
  document.getElementById('app')
);
