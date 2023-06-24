import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Routes>{/* <Route path="/" element={<SearchParams />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default App;
