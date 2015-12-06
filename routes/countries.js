var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
    var url = 'https://restcountries.eu/rest/v1/all';
    request({
        headers: {
            "Accept": "application/json",
            "X-Mashape-Key": "qaqf05MPfsmshXxQf0nJpngOgz5up1Xx0LIjsnXklI7TRj49yd"
        },
        uri: "https://restcountries-v1.p.mashape.com/all"
    }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var items = JSON.parse(body);
            res.json(items);
        }

        else {
            res.json({
                error: 'There was a problem retrieving countries'
            });
        }
    })
});

module.exports = router;
