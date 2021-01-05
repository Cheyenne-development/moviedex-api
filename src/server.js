require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIE = require('../movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;

  console.log('validate bearer token middleware');
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  // move to the next middleware
  next();
});

app.get('/movie', function handleGetMovie(req, res)  {
  let { genre, country, avg_vote } = req.query;
  let movies = MOVIE;
  
  if(genre){
    movies = movies.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  } 
 if(country.toLowerCase() === "us" || country.toLowerCase() === "u.s." || country.toLowerCase() === "usa" || country.toLowerCase() === "america"){
   country = "United States"
 }
if(country.toLowerCase() === "uk" || country.toLowerCase() === "gb" || country.toLowerCase() === "england"
|| country.toLowerCase() === "scotland" || country.toLowerCase() === "wales" || country.toLowerCase() === "united kingdom"){
  country = "Great Britain"
}

  if(country){
    movies = movies.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  } 
   

  
  if(avg_vote){
    movies = movies.filter(function (movie) { 
      return movie.avg_vote >= Number(avg_vote)})
  }

  res.json(movies);
});

const PORT = 8000;

app.listen(PORT, () =>{
  console.log(`Server started at http://localhost:${PORT}`);
});

