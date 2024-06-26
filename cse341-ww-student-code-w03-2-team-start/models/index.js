require('dotenv').config;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_DB_URI;
db.contacts = require('./contact.js')(mongoose);

module.exports = db;
