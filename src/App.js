import NavBar from "./components/NavBars";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import { MovesYouWatched } from "./components/WatchedMovies";
import { NoResults } from "./components/NavBars";
import { Movie } from "./components/MovieList";
import { Box } from "./components/Main";
import Input from "./components/NavBars";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("black");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const Key = "29696923";
  const theMovie = "fBlack panther";

  useEffect(() => {
    async function fetchMovies() {
      setError("");
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&s=${query}`
        );
        if (!res.ok) throw Error("Something went wrong");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message || "Not found");
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  function Loading() {
    return <p className="loader">Loading..</p>;
  }
  function Error({ message }) {
    return (
      <p className="error">
        <span>❌</span> {message}{" "}
      </p>
    );
  }
  return (
    <>
      <NavBar query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {error && <Error message={error} />}
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <Movie
              movies={movies}
              setSelectedMovie={setSelectedMovie}
              selectedMovie={selectedMovie}
            />
          )}
        </Box>
        <Box>
          <MovesYouWatched
            setWatched={setWatched}
            watched={watched}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        </Box>
      </Main>
    </>
  );
}
