var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventSchema = new Schema({
	eventNumber : Number,
	nameOfEvent : String,
	date : String,
	timeOfEvent : String,
	descriptionOfEvent : String,
	image : String,
	coordinates : String
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;