angular
    .module('guessTheCountry')
    .factory('Flickr', function($http) {
        return {
            getPlaceID: function(query) {
                return $http.get('/api/flickr/place-id/' + query).then(function(response) {
                    return response.data.place_id;
                });
            },

            getPhotos: function(id) {
                return $http.get('/api/flickr/photos/' + id).then(function(response) {
                    return response.data.photo;
                });
            }
        }
    });
