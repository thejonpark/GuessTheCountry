var express = require('express');
var router = express.Router();
var Flickr = require('node-flickr');
var keys = {
    "api_key": '13cc55e2e8c87279b8320f62bd04038e'
}
var flickr = new Flickr(keys);

router.get('/photos/:id', function(req, res, next) {
    flickr.get("photos.search", {"place_id": req.params.id, "sort": "interestingness-desc", "per_page": "5"}, function(err, result) {
        if (err) {
            return console.error(err);
        }

        else {
            res.json(result.photos);
        }
    });
});

router.get('/place-id/:query', function(req, res, next) {
    flickr.get("places.find", {"query": req.params.query}, function(err, result) {
        if(err) {
            return console.error(err);
        }

        else {
            res.json(result.places.place[0]);
        }
    });
});

module.exports = router;
