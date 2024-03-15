import React from "react";

export function Movie({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <SingleMov movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function SingleMov({ movie }) {
  return (
    <li>
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
