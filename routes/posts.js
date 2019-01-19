var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './public/images' })
var expressValidator = require('express-validator')

const {Post} = require('../models/post')
const {Category} = require('../models/categories')

router.get('/show/:id', function(req, res) {
    Post.findById(req.params.id).then((err,post)=>{
        res.render('show',{
            post:post
        }),(e)=>{
            res.status(400).send(e)
        }
    })

});

router.get('/add', function(req, res) {
    Category.find().then((categories)=>{
        res.render('addpost',{
            'title':'Add Post',
            categories:categories
        }),(e)=>{
            res.status(400).send(e)
        }
    })
});

router.post('/add', upload.single('mainimage'), function(req, res) {
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var author = req.body.author;
    var date = new Date();

    if(req.file)
    {
        var mainimage = req.file.filename
    }else{
        var mainimage = 'noimage.jpg'
    }

    req.checkBody('title','Title field is required').notEmpty();
    req.checkBody('body','Body field is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('addpost',{
            "errors":errors
        })
    }else{
        var newPost= new Post(
            {
                title:title,
                category:category,
                author:author,
                body:body,
                date:date,
                mainimage:mainimage
            });

            newPost.save().then((doc)=>{
                    console.log('Saved Post',doc);
                },(e)=>{
                    console.log('Unable to save Post')
                })

        req.flash('Success','Post has been added');

        res.location('/')
        res.redirect('/')
            
    }
});

router.post('/addcomment', (req, res)=> {
    var name = req.body.name;
    var email= req.body.email;
    var body = req.body.body;
    var postid= req.body.postid;
    var commentdate = new Date();


    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('email','Email field is required, but never empty').notEmpty();
    req.checkBody('email','Email is not formatted properly').isEmail();
    req.checkBody('body','Body field is required')

    var errors = req.validationErrors();

    if(errors){
        Post.findById(postid,(post)=>{
            res.render('show',{
                post:post
            })
        })
       
    }else{
        var comment = {
            name:name,
            email:email,
            body:body,
            commentdate:commentdate
        }

        Post.update({
            _id:postid
        },{
            $push:{
                comments:comment
            }
        },(err,doc)=>{
            if(err){
                throw err;
            }
            else{
                req.flash('success','Comment Added');
                res.location('/posts/show'+postid)
                res.redirect('/posts/show'+postid)
        }
        })

    }

  console.log(postid)
});

module.exports = router;