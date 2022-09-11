const dbConfig = require("../db/db.config.js");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.DatosPersonalesSchema = require('./datospersonales.model.js')(mongoose);
module.exports = db;