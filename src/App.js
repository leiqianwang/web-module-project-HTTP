import React, { useEffect, useState } from "react";

import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    // Make a DELETE request using Axios
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(() => {
        setMovies(currentMovies => currentMovies.filter(movie => movie.id !== id));  // On success update the movies list in state
        navigate("/movies");     // navigate the user to /movies
      })
      .catch(err => {
        console.log(err);
      });
    // Hand this function down to the correct component
  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id"  element={<EditMovieForm setMovies={setMovies} />} />

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} />}/>

            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies} />} />

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
