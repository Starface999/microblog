var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EventSchema = new Schema({
	name : String,
	date: String,
	time: String,
	latitude: Number,
	longitude: Number,
	descriptionOfEvent : String,
	imageUrl : String,
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;