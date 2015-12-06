angular
    .module('guessTheCountry')
    .factory('Countries', function($http) {
        return {
            getAllCountries: function() {
                return $http.get('/api/countries').then(function(response) {
                    return response.data;
                })
            }
        }
    });
