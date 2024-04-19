import React from "react";
import { useState } from "react";

export default function NavBar({ children, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Input query={query} setQuery={setQuery} />
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
function Input({ query, setQuery }) {
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
