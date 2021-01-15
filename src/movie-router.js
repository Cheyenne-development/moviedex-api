const express = require('express');
const MOVIE = require('../movies-data.json');

const movieRouter = express.Router();

movieRouter
  .route('/movie')
  .get((req, res) =>  {
    let { genre, country, avg_vote, film } = req.query;
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
     
  
    
    if(avg_vote){
      movies = movies.filter(function (movie) { 
        return movie.avg_vote >= Number(avg_vote);
      });
    }

    if(film) {
      /*for(let i = 0; i < movies.length; i++){
        if( typeof movies[i].film_title != 'string'){
          console.log(movies[i])
        }
      }*/
    
       movies = movies.filter(movie => 
        typeof movie.film_title == 'number' ?
          movie.film_title - film === 0 :
          movie.film_title.toLowerCase().includes(film.toLowerCase()))
        }
    
  
    res.json(movies);
  })

module.exports = movieRouter;