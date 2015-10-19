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
mongoose.connect('mongodb://localhost/microblog');
// body parser config to accept our datatypes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = require('./models/event.js');

process.on('uncaughtException', function (err) {
    console.log(err);
});




app.get('/', function (req, res) {
	db.Event.find({}, function (err, events) {
		if (err) { return console.log("find error: " + err); }
		res.render('index', {events: events});
	});
});

//show:
app.get('/events/:id', function (req, res) {
	// var evnt = events[req.params.id];
	db.Event.find({_id: req.params.id}, function (err, events) {
	  res.render('event-show', { evnt: events });	
	});
});
//create:
app.post('/events', function (req, res){
	var evnt = req.body.name;
	Event.create(evnt, function (err, events) {
		res.status(200).json(events);
	});
});

var server = app.listen(5000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening on port 5000");
});

