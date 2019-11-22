'use strict';

// dotenv Configuration
require('dotenv').config();

// Application Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.error(err));

// Middleware to handle PUT and DELETE
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

// View Engine
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// API Routes
app.get('/', homePage)
app.get('/location', getLocation);
app.post('/trails', saveTrail);
app.get('/trails/:id', getOneTrail);
app.put('/trails/:id', updateTrail);
app.delete('/trails/:id', deleteTrail);
app.get('/favorites', getTrails);
app.get('/about', aboutHandler);

// Trail Constructor
function Trail(data) {
  const placeholder = 'https://i.imgur.com/iaV1Lp0.jpg';
  let httpRegex = /^(http:\/\/)/g

  this.name = data.name ? data.name : 'No name available';
  this.summary = data.summary ? data.summary : 'No summary available';
  this.trail_id = data.id;
  this.difficulty = data.difficulty === 'green' || data.difficulty === 'greenBlue' ? 'Easy' : data.difficulty === 'blue' ? 'Intermediate' : data.difficulty === 'blueBlack' ? 'Hard' : 'Expert';
  this.stars = data.stars ? data.stars : '';
  this.imgURL = data.imgSmallMed ? data.imgSmallMed.replace(httpRegex, 'https://') : placeholder;
  this.latitude = data.latitude;
  this.longitude = data.longitude;
  this.length = data.length ? data.length : 'No length available';
  this.conditionStatus = data.conditionStatus ? data.conditionStatus : 'No condition status available';
  this.conditionDetails = data.conditionDetails ? data.conditionDetails : 'No condition details';
}

Trail.prototype.save = function(){
  const SQL = 'INSERT INTO trail(name, summary, trail_id, difficulty, stars, img_small, latitude, longitude,length, conditionstatus, conditiondetails) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
  let values = Object.values(this);
  return client.query(SQL, values);
}

// Location Constructor
function Location(query, data) {
  this.search_query = query;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

// Campground Constructor
function Campground(data){
  this.id = data.id;
  this.name = data.name;
  this.isBookable = data.isBookable;
  this.location = data.location;
  this.latitude = data.latitude;
  this.longitude = data.longitude;
  this.url = data.url;
  this.imgUrl = data.imgUrl;
  this.numCampsites = data.numCampsites;
}

// Hiking Project API Pull
function makeList(latitude,longitude,maxDistance,endpoint){
  const hikeURL = `https://www.hikingproject.com/data/${endpoint}?lat=${latitude}&lon=${longitude}&maxDistance=${maxDistance}&maxResults=10&key=${process.env.HIKING_PROJECT_API_KEY}`;
  return superagent.get(hikeURL)
    .then( hikeAPICallResult => {
      if(endpoint === 'get-trails') return hikeAPICallResult.body.trails.map(trailObject => new Trail(trailObject));
      else return hikeAPICallResult.body.campgrounds.map(campgroundObject => new Campground(campgroundObject));
    })
    .catch(err => console.error(err));
}

// Parses through data and creates map markers for map API
function mapMaker(list){
  return list.reduce((staticMapURL, object) => {
    if (list.indexOf(object) + 1 !== list.length) staticMapURL += object.latitude.toString() + ',' + object.longitude.toString() + '|';
    else staticMapURL += object.latitude.toString() + ',' + object.longitude.toString() + `&key=${process.env.GEOCODE_API_KEY}`;
    return staticMapURL;
  }, 'https://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=terrain&markers=color:green|');
}


// Convert location to lat/lon and pulls from APIS to render data
function getLocation(req,res){
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.data}&key=${process.env.GEOCODE_API_KEY}`
  const everythingYouCouldEverWant = {};
  return superagent.get(geocodeUrl)
    .then( result => {
      return new Location(req.query.data, result.body.results[0]);
    })
    .then( location => {
      everythingYouCouldEverWant.location = location;
      return makeList(location.latitude, location.longitude, req.query.maxMiles, req.query.endpoint);
    })
    .then( list => {
      everythingYouCouldEverWant.list = list;
      return mapMaker(list);
    })
    .then(staticMapURL => {
      everythingYouCouldEverWant.staticMapURL = staticMapURL;
      res.render('pages/results', {data: everythingYouCouldEverWant});
    })
    .catch(err => console.error(err));
}

// Redirects after saving selected trail to database
function saveTrail(req, res) {
  let trailDetails = new Trail(JSON.parse(req.body.object));
  trailDetails.save()
    .then(res.redirect('/favorites'));
}

// Render all saved trails from database to page
function getTrails(request, response){
  let SQL = 'SELECT * FROM trail';
  return client.query(SQL)
    .then( results => response.render('pages/favorite', {trails: results.rows}))
    .catch(err =>handleError(err,response));
}

// Opens selected trail in detail view
function getOneTrail(request,response) {
  let SQL = 'SELECT * FROM trail WHERE id=$1';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(result => response.render('pages/trails/detail', {result: result.rows[0]}))
    .catch(err => console.err(err))
}

// Updates Trail information in database
function updateTrail(request,response){
  let { name, summary, difficulty, img_small, length} = request.body;
  let SQL = 'UPDATE trail SET name=$1, summary=$2, difficulty=$3, img_small=$4, length=$5 WHERE id=$6';
  let values = [name, summary, difficulty, img_small, length, request.params.id];

  return client.query(SQL, values)
    .then(response.redirect(`/trails/${request.params.id}`))
    .catch(err => console.error(err));
}

// Deletes selected trail from database
function deleteTrail(request,response){
  let SQL = 'DELETE FROM trail WHERE id=$1';
  let value = [request.params.id];

  return client.query(SQL, value)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

// Error Handler Function
function handleError(error,response) {
  response.render('error', {error: error})
}

// About Us Page
function aboutHandler(request,response) {
  response.render('pages/about');
}

// Home Page
function homePage(request,response) {
  response.render('index');
}

// Application Listener
app.listen(PORT, console.log(`Listening on Port: ${PORT}`))
