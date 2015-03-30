'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var chMemberSchema = new Schema({
	name: String, 
	phone: String,
	group: Number, 
	today: Date,
	count: Number
});


module.exports = mongoose.model('chMembers', chMemberSchema);
