import React, { useEffect } from "react";
import { useRef } from "react";

export default function NavBar({ children, query, setQuery }) {
  const FocusOn = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", callback);
    function callback(e) {
      if (document.activeElement === FocusOn.current) return;
      if (e.key === "Enter") {
        FocusOn.current.focus();
        setQuery("");
      }
    }
  }, []);
  return (
    <nav className="nav-bar">
      <Logo />
      <Input query={query} setQuery={setQuery} FocusOn={FocusOn} />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Input({ query, setQuery, FocusOn }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={FocusOn}
    />
  );
}
export function NoResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies}</strong> results
    </p>
  );
}
