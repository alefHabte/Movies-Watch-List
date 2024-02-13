import React from "react";
import { useState } from "react";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Input />
      <NoResults />
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
function NoResults() {
  return (
    <p className="num-results">
      Found <strong>x</strong> results
    </p>
  );
}
