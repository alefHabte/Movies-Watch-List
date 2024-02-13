import MovieList from "./MovieList";
import WatchedMovies from "./WatchedMovies";

export default function Main({ tempWatchedData, tempMovieData }) {
  return (
    <main className="main">
      <MovieList tempMovieData={tempMovieData} />
      <WatchedMovies tempWatchedData={tempWatchedData} />
    </main>
  );
}
