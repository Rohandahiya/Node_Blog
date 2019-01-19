const express = require('express');
const router = express.Router();
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const {Post} = require('../models/post')

/* GET home page. */
router.get('/', (req, res) => {
    Post.find().then((posts)=>{
        res.render('index',{posts:posts})
    },(e) => {
        res.status(400).send(e)
    })
});

module.exports = router;