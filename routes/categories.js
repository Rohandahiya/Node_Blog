var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator')

const {Post} = require('../models/post')
const {Category} = require('../models/categories')

router.get('/show/:category', (req, res) => {
    Post.find({category: req.params.category}).then((posts)=>{
        res.render('index',{
            'title':req.params.category,
            posts:posts
        }),(e)=>{
            res.status(400).send(e)
        }
    })

 });
 
router.get('/add', (req, res) => {
   res.render('addcategory',{
       'title':'Add Category'
   });
});

router.post('/add',(req,res)=>{
    var name = req.body.name;

    req.checkBody('name','Name field is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('addcategory',{
            "errors":errors
        })
    }else{
        var newCategory= new Category(
            {
                name:name
            })

        newCategory.save().then((doc)=>{
                    console.log('Saved Category',doc);
                },(e)=>{
                    console.log('Unable to save category')
                })

        req.flash('Success','Category has been added');

        res.location('/')
        res.redirect('/')
            
    }

})

module.exports = router;