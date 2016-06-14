import classNames from 'classNames';
import React from 'react';
import { updateMovie } from '../utils/MoviesWebAPIUtils';

class MovieItem extends React.Component{
  constructor (props) {
    super(props);
  }

  _onToggleWatched () {
    const movie = this.props.movie;
    updateMovie(movie.id, { movie: { watched: !movie.watched } });
  }

  render () {
    const movie = this.props.movie;
    return(
      <li>
        <div>
          <input type="checkbox" onChange={this._onToggleWatched.bind(this)} checked={movie.watched} />
          <span>
            {movie.name}
          </span>
        </div>
      </li>
    )
  }
}

export default MovieItem;
