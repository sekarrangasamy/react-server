const mongoose = require('mongoose');

const Personal = mongoose.Schema({
	name: String,
	phone: Number,
	email: String,
	address: String
	},{
	timestamps: true
});

module.exports = mongoose.model('Personal', Personal);