import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Container, Button } from "react-bootstrap";

import SingleMovieContainer from "./SingleMovieContainer";

class MovieSegment extends React.Component {
  state = {
    movies: [],
    selected: {
      isSelected: false,
      movieId: "",
      moviePoster: "",
    },
  };

  fetchMovies = async (movies) => {
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?apikey=131a9fa6&s=${movies}`
      );
      if (response.ok) {
        let movieData = await response.json();
        this.setState({
          movies: movieData.Search,
        });
      } else {
        alert("movies were not loaded");
      }
    } catch (error) {
      alert(error);
    }
  };
  clickHandler = (e, movieid, moviePoster) => {
    // console.log(e.target.parentNode.parentNode);
    // e.target.parentNode.parentNode.classList.add("active-movie");
    this.setState({
      selected: {
        ...this.state.selected,
        isSelected: !this.state.selected.selected,
        movieId: movieid,
        moviePoster: moviePoster,
      },
    });
    // console.log(this.state.selected);
  };
  componentDidMount = () => {
    let query = this.props.name.toLowerCase().split(" ").join("+");
    console.log(query);
    this.fetchMovies(query);
  };

  render() {
    return (
      <>
        <Container fluid className="container-movie">
          {this.state.selected.isSelected && (
            <div
              style={{
                display: this.state.selected.isSelected ? "block" : "none",
                position: "relative",
              }}
            >
              <SingleMovieContainer
                poster={this.state.selected.moviePoster}
                movieId={this.state.selected.movieId}
                isSelected={this.state.selected.isSelected}
              />
              <button
                className="close-single-movie"
                onClick={() =>
                  this.setState({
                    selected: { ...this.state.selected, isSelected: false },
                  })
                }
              >
                Close
              </button>
            </div>
          )}

          <h2 className="movie-segment-title">{this.props.title}</h2>
          <Splide
            className="movie-segment-carousel"
            options={{
              type: "loop",
              rewind: true,
              width: "100%",
              gap: "0.3rem",
              perPage: 6,
              perMove: 1,
              breakpoints: {
                640: {
                  perPage: 1,
                },
                800: {
                  perPage: 2,
                },
              },
              padding: {
                right: "5rem",
                left: "5rem",
              },
              pagination: false,
              classes: {
                arrow: "splide__arrow movie-segment-arrow",
              },
            }}
          >
            {this.state.movies.map((movie) => (
              <SplideSlide className="single-movie-slide" key={movie.imdbID}>
                <div className="single-movie-item">
                  <div className="movie-cover">
                    <img src={movie.Poster} alt="" />
                  </div>
                  <div className="single-movie-body">
                    <h4>{movie.Title}</h4>
                    <small>{movie.Year}</small>
                    <Button
                      className="movie-details-btn"
                      onClick={(e) =>
                        this.clickHandler(e, movie.imdbID, movie.Poster)
                      }
                    >
                      Check details!
                    </Button>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </Container>
      </>
    );
  }
}

export default MovieSegment;

{
  /* <div className="single-movie-item">
            <img
              src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABfHVUAAEhu-G5QHH31CutuqX0wBfTK4nzyJXSyUkXm13Stw-yFpmeMzfTkBcmlsWu_CHM-JNr2d2sjncwPLkqG968JMe.jpg?r=321"
              alt="Image 1"
            />
          </div> */
}
