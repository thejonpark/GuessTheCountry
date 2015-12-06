var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

var countries = require('./routes/countries');
app.use('/api/countries', countries);

var flickr = require('./routes/flickr');
app.use('/api/flickr', flickr);

app.get('/', function(req, res){
    res.render('index');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
