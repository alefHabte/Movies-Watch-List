import React, { useEffect, useRef } from "react";
import { useState } from "react";
import StarRating from "./StarRating";
import { useKeys } from "../useKeys";

export function MovesYouWatched({
  watched,
  selectedMovie,
  setSelectedMovie,
  setWatched,
}) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);
  const Key = "29696923";
  const [MovieView, setMovieView] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRating = useRef(0);

  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovie);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedMovie
  )?.userRating;

  function onClose() {
    setSelectedMovie(null);
  }
  function handelRmMovie(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  function AddToWatchedList() {
    const movieDetail = {
      title,
      poster,
      runtime: runtime.split(" ").at(0),
      imdbRating,
      userRating,
      imdbID,
      ratingChanged: countRating.current,
    };

    setWatched((watched) => [...watched, movieDetail]);

    onClose();
  }

  const {
    Title: title,
    Year: year,
    Rated: rating,
    Released: released,
    Poster: poster,
    Genre: genre,
    Runtime: runtime,
    Plot: plot,
    Actors: actors,
    Director: director,
    imdbRating: imdbRating,
    imdbID: imdbID,
  } = MovieView;

  useKeys("Escape", onClose);

  useEffect(() => {
    async function loadMovieDetails() {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${Key}&i=${selectedMovie}`
      );
      const data = await response.json();
      setMovieView(data);

      setIsLoading(false);
    }

    loadMovieDetails();
  }, [selectedMovie]);
  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  useEffect(() => {
    if (userRating) {
      countRating.current++;
    }

    function cleanUp() {
      countRating.current = 0;
    }
  }, [userRating]);

  return (
    <>
      {selectedMovie ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="details">
              <header>
                <button
                  className="btn-back"
                  onClick={() => {
                    onClose();
                  }}
                >
                  &larr;
                </button>

                <img src={poster} alt="poster" />

                <div className="details-overview">
                  <h2>{title}</h2>
                  <p>
                    {released}&bull; {runtime}
                  </p>
                  <p>{genre}</p>
                  <p>
                    <span>⭐</span>
                    {MovieView.imdbRating} IMDB rating
                  </p>
                </div>
              </header>

              <section>
                <div className="rating">
                  {!isWatched ? (
                    <>
                      <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={setUserRating}
                      />

                      {userRating > 0 && (
                        <button className="btn-add" onClick={AddToWatchedList}>
                          + Add to list
                        </button>
                      )}
                    </>
                  ) : (
                    <p>Already gave a rating of {watchedUserRating} 🌟</p>
                  )}
                </div>

                <p>
                  <em>{plot}</em>
                </p>
                <p>Staring{actors}</p>

                <p>Directed by{director}</p>
              </section>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>
          <WatchedMovieList watched={watched} handelRmMovie={handelRmMovie} />
        </>
      )}
    </>
  );
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedMovieList({ watched, handelRmMovie }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <MovieEach
            movie={movie}
            key={movie.imdbID}
            handelRmMovie={handelRmMovie}
          />
        ))}
      </ul>
    </>
  );
}
function Loading() {
  return <p className="loader">Loading..</p>;
}

function MovieEach({ movie, handelRmMovie }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>

        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button className="btn-delete">
            <span onClick={() => handelRmMovie(movie.imdbID)}>❌</span>
          </button>
        </div>
      </li>
    </>
  );
}
