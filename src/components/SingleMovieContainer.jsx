import React from "react";
import CommentArea from "./CommentArea";

class SingleMovieContainer extends React.Component {
  state = {
    movieId: "",
    singleMovie: null,
  };

  fetchSingleMovie = async () => {
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?apikey=131a9fa6&i=${this.props.movieId}`
      );
      if (response.ok) {
        let movieInfo = await response.json();
        this.setState({
          ...this.state.singleMovie,
          singleMovie: movieInfo,
        });
        console.log(this.state.singleMovie);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    console.log(this.props.movieId);
    this.fetchSingleMovie();
  };

  render() {
    return (
      <>
        {this.state.singleMovie && (
          <div
            className="single-movie-container"
            style={{
              backgroundSize: "cover",
              backgroundImage: `linear-gradient(
                    270deg,
                    rgba(164, 164, 164, 0.13) 0%,
                    rgba(0, 0, 0, 0.8883928571428571) 50%,
                    rgba(0, 0, 0, 1) 65%
                  ),
                  url(${this.state.singleMovie.Poster})`,
            }}
          >
            <div className="single-movie-info">
              <h1>{this.state.singleMovie.Title}</h1>
              <div className="movie-release-details">
                <small className="movie-rate">
                  {this.state.singleMovie.Year}
                </small>
                <small className="movie-rate">
                  {this.state.singleMovie.Rated}
                </small>
                <small className="movie-rate">
                  {this.state.singleMovie.Runtime}
                </small>
                <small className="movie-rate">
                  IMDB:
                  {this.state.singleMovie.imdbRating}
                </small>
              </div>
              <p>{this.state.singleMovie.Plot}</p>
              <h5>Actors:</h5>
              <p>{this.state.singleMovie.Actors}</p>
            </div>
            <CommentArea movieId={this.props.movieId} />
          </div>
        )}
      </>
    );
  }
}
export default SingleMovieContainer;
