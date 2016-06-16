import classNames from 'classNames';
import React from 'react';
import { deleteMovie, updateMovie } from '../utils/MoviesWebAPIUtils';

class MovieItem extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      editMode: null
    }
  }

  _deleteMovie () {
    const movie = this.props.movie;
    deleteMovie(movie.id);
  }

  _onToggleWatched () {
    const movie = this.props.movie;
    updateMovie(movie.id, { movie: { watched: !movie.watched } });
  }

  _onSubmitForm (event) {
    event.preventDefault();
    const movie = this.props.movie;
    const input = event.target.firstChild;
    updateMovie(movie.id, { movie: { name: input.value } });
    this.setState({editMode: null});
  }

  _showEditor () {
    this.setState({editMode: true});
  }

  _renderUpdateForm (movie) {
    return (
      <form onSubmit={this._onSubmitForm.bind(this)}>
        <input type="text" defaultValue={movie.name}/>
      </form>
    )
  }

  _showMovie (movie) {
    return (
      <span onDoubleClick={this._showEditor.bind(this)}>
        {movie.name}
        <button onClick={this._deleteMovie.bind(this)}>x</button>
      </span>
    )
  }

  render () {
    const movie = this.props.movie;

    return(
      <li>
        <div>
          <input type="checkbox" onChange={this._onToggleWatched.bind(this)} checked={movie.watched} />
          { this.state.editMode ? this._renderUpdateForm(movie) : this._showMovie(movie) }
        </div>
      </li>
    )
  }
}

export default MovieItem;
