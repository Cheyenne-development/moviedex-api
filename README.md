# moviedex-api
To use, clone or download repository.
Change to directory and npm install
npm start to run server
Usage of api key disabled by default. To enable rename example.env to .env and change line 18 in app.js to app.use(validateBearerToken);
An api to search movies endpoint is /api/movie
Search terms are title, rating, country, and genre.
example http://localhost:8000/api/movie?title=casablanca
