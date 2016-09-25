var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    mongoose = require('mongoose');

var models     = require('./models/tvshows')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);



// API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

mongoose.connect('mongodb://localhost/tvshows',function(err,res){
    if(err){
        console.log('Error: conecting to datebase. '+err);
    }


});

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
