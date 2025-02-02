const express = require('express');
const MOVIE = require('../movies-data.json');

const movieRouter = express.Router();

movieRouter
  .route('/movie')
  .get((req, res) =>  {
    let { genre, country, rating, title } = req.query;
    let movies = MOVIE;
    
    if(genre){
      movies = movies.filter(movie =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      );
    } 
    
  
    if(country){
      if(country.toLowerCase() === 'us' || country.toLowerCase() === 'u.s.' || country.toLowerCase() === 'usa' || country.toLowerCase() === 'america'){
        country = 'United States';
      }
      if(country.toLowerCase() === 'uk' || country.toLowerCase() === 'gb' || country.toLowerCase() === 'england'
  || country.toLowerCase() === 'scotland' || country.toLowerCase() === 'wales' || country.toLowerCase() === 'united kingdom'){
        country = 'Great Britain';
      }
      movies = movies.filter(movie =>
        movie.country.toLowerCase().includes(country.toLowerCase())
      );
    } 
     
  
    
    if(rating){
      movies = movies.filter(function (movie) { 
        return movie.avg_vote >= Number(rating);
      });
    }

    if(title) {
          
       movies = movies.filter(movie => 
        typeof movie.film_title == 'number' ?
          movie.film_title - title === 0 :
          movie.film_title.toLowerCase().includes(title.toLowerCase()))
        }
    
  
    res.json(movies);
  })

module.exports = movieRouter;