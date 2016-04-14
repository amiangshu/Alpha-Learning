/**
 * Created by Andrew Kralovec 
 */
var express = require('express');
var router = express.Router();
// All possible mongo db objects 
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');
    
// Home page
router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
            db.open(function (err, db) {
                // Get user object, This features will be removed once the sessions feature is added
                db.collection('Accounts').findOne({username:username}, function (err, doc) {
                    assert.equal(null, err);
                    if (doc != null) {
                        var documents = doc.Courses ; 
                        console.log("Found");
                        res.render('home', { title: 'User Hame Page', message: username, documents:documents});
                    }
                    else {
                        res.render('error', { title: 'Error Page'});
                    }
                });
            });
});

// Test out user profile pages 
router.get('/:username/Profile',function(req,res,next){
    var username = req.params.username;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
            db.open(function (err, db) {
                // Get user object, This features will be removed once the sessions feature is added
                db.collection('Accounts').findOne({username:username}, function (err, doc) {
                    assert.equal(null, err);
                    if (doc != null) {
                        var documents = doc.Courses ; 
                        console.log("Found");
                        req.session.user = doc;
                        req.session.Logged = true ; 
                        res.render('profile', { title: 'User Profile Page', username: username, documents:documents});
                    }
                    else {
                        res.render('error', { title: 'Error Page'});
                    }
                });
            });
});
// Test out quiz pages
router.get('/:username/Quiz',function(req,res,next){
  res.render('quiz',{title:"Quiz "}); 
});
// ERROR
router.get('/error', function (req, res, next) {
    res.render('error', { title: 'Error Page'});
});

router.get('/post', function (req, res, next) {
    res.render('post', {title: 'Create Post'});
});


module.exports = router;
