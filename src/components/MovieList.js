import React, { useEffect } from "react";

export function Movie({ movies, setSelectedMovie, selectedMovie }) {
  return (
    <ul className="list list-movies li ">
      {movies?.map((movie) => (
        <SingleMov
          movie={movie}
          key={movie.imdbID}
          setSelectedMovie={setSelectedMovie}
          selectedMovie={selectedMovie}
        />
      ))}
    </ul>
  );
}

function SingleMov({ movie, setSelectedMovie, selectedMovie }) {
  return (
    <li
      onClick={() => {
        selectedMovie === movie.imdbID
          ? setSelectedMovie(null)
          : setSelectedMovie(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
