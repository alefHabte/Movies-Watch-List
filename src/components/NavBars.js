import React from "react";
import { useState } from "react";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Input />
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
function Input() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
