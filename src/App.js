import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppHeader from "../src/views/header/index";
import Movie from "./views/movie/index";
import MovieDetails from "./views/movie-details/index";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/details/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
