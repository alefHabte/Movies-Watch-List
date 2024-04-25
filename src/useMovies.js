import { useState, useEffect } from "react";
export function useMovies(query) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const Key = "29696923";
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setError("");
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw Error("Something went wrong");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Not found");
          console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    // handelCLosed();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return { error, isLoading, movies };
}
