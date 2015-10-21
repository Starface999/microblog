// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require('express');
var app = express();
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));

// body parser config to accept our datatypes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./models/index.js');
// your database

process.on('uncaughtException', function (err) {
    console.log(err);
});




app.get('/', function (req, res) {
	db.Event.find( // search for events
		{}, // not specifying any properties to look for, so it returns all that it finds
		function (err, eventsFromDB) { 
		// the first result of the Find function will be an error if there is an error
		if (err) { 
			return console.log("find error: " + err); 
		// if there is no error, the Find function will return the Event documents / JSON objects from the DB
		} else {
			// render the index.ejs page, using the events data to populate it dynamically
			res.render('index', {events: eventsFromDB});
		}
	});
});

//show:
app.get('/events/:id', function (req, res) {
	// var evnt = events[req.params.id];
	console.log(req.params); // { _id: 1 }
	db.Event.find({_id: req.params.id}, function (err, searchedEvent) {
	  res.render('event-show', { events: searchedEvent });
	});
});
//create:
app.post('/events', function (req, res){
	// var eventData = req.body;
	var newEvent = new db.Event(req.body);
	// db.Event.create
	newEvent.save(
		// eventData, 
		function (err, createdEvent) {
		res.status(200).json(createdEvent);
	});
});

var server = app.listen(5000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening on port 5000");
});

