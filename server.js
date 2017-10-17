const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGODB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/erickvazquez';

//mongoose.connect('mongodb://localhost/erickvazquez')
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

const app = express()
app.use(morgan('combined'))

// Create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Database setup
var db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', function() {
	// Create the schema here
	// Add Methods or whatever to the schema here
	// Create your  API endpoints here
	app.get('/api/v1/test', function(req, res) {
		res.json("Hello, World!")
	})
})


const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`TODO List API listening on port ${port}`)