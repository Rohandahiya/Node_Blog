const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeblog')

var db = mongoose.connection;

var categorySchema = mongoose.Schema({
    name:String
})

var Category = mongoose.model('Category',categorySchema );

module.exports = {Category};


