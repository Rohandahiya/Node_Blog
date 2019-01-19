const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeblog')

var db = mongoose.connection;

var postSchema = mongoose.Schema({
    title:String,
    category:String,
    author:String,
    body:String, 
    date:String  ,   
    mainimage:String
})

var Post = mongoose.model('Post',postSchema );

module.exports = {Post};

var newPost = new Post({
    title:"Blog Post One",
    category:"Technology",
    author:"Rohan",
    body:"This is the body",
    date:"14-07-1998"
})

var newPost2 = new Post(
{
    title:"Blog Post Two",
    category:"Science",
    author:"Braad",
    body:"This is the body of the second blog",
    date:"14-12-1998"
})



// newPost.save().then((doc)=>{
//     console.log('Saved Todo',doc);
// },(e)=>{
//     console.log('Unable to save todo')
// })

// newPost2.save().then((doc)=>{
//     console.log('Saved Todo',doc);
// },(e)=>{
//     console.log('Unable to save todo')
// })
