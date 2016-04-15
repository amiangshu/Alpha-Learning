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

router.get('/', function (req, res, next) {
    res.render('courses', { title: 'Course Page'});
}); 

// Will add :CourseName
router.get('/:CourseName', function (req, res, next) {
    var CourseName = req.params.CourseName;
    var db = new Db('AlphaLearning', new Server('localhost', 27017));
            db.open(function (err, db) {
                // Get user object, This features will be removed once the sessions feature is added
                db.collection('Courses').findOne({path:CourseName}, function (err, doc) {
                    assert.equal(null, err);
                    if (doc != null) {
                        var Posts = doc.Posts ; 
                        console.log("Found");
                        res.render('course', { title: 'Course Page', CourseName: CourseName, Posts:Posts});
                    }
                    else {
                        res.render('error', { title: 'Error Page'});
                    }
                });
            });
});

router.get('/:CourseName/post', function (req, res, next) {
    res.render('post', { title: 'Post Page'});
});

router.get('/error', function (req, res, next) {
    res.render('error.jade', { title: 'Error Page'});
});


module.exports = router;
