var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/thelist', function(req, res) {
  var MongoClient = mongo.MongoClient;
  var url = "mongodb://localhost:27017/kapriz";
  MongoClient.connect(url,function (err, db) {
    if(err){
      console.log('Unable to connect to database', err);
    }else{
      console.log('Connection establish');
      var collection = db.collection('services');

      collection.find({}).toArray(function(err, result){
        if(err){
          res.send(err);
        } else if(result.length){
          res.render('servicelist',{
            "servicelist" : result
          });
        } else {
          res.send('No documents found');
        }

        db.close();
      });
    }
  });
});

router.get('/newservice', function(req,res){
  res.render('newservice', {title: 'Добавить услугу'});
});

router.post('/addservice', function(req,res){
  var MongoClient = mongo.MongoClient;
  var url = "mongodb://localhost:27017/kapriz";
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log('Unable to connect to database', err);
    }else{
      console.log('Connected to server');
      var collection = db.collection('services');
      var service1 = {service: req.body.service};
      collection.insert([service1], function (err ,result) {
        if(err){
          console.log(err);
        } else {
          res.redirect("thelist");
        }
        db.close();
      });
    }
  })
});

module.exports = router;
