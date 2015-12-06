angular
    .module('guessTheCountry')
    .controller('GameController', function($location, Countries, Flickr, GameData) {
        var vm = this;
        vm.points = 0;
        vm.answer = {};
        vm.loading = true;
        vm.photoList = [];

        vm.getRandomCountry = function() {
            return Countries.getAllCountries().then(function(countries) {
                var randomNumber = Math.floor(Math.random() * countries.length);
                return countries[randomNumber]
            });
        };

        vm.generateNewCountry = function() {
            vm.loading = true;
            vm.getRandomCountry().then(function(country) {
                console.log('The answer is ' + country.name);
                vm.answer = country.name;
                Flickr.getPlaceID(country.name).then(function(place_id) {
                    Flickr.getPhotos(place_id).then(function(photos) {
                        vm.photoList = [];
                        photos.forEach(function(photo) {
                            var photoUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';
                            vm.photoList.push(photoUrl);
                        });

                        vm.loading = false;
                    });
                });
            });
        }

        vm.submitAnswer = function() {
            if(vm.countryName != "") {
                if(vm.answer.toLowerCase() == vm.countryName.toLowerCase()) {
                    vm.points++;
                    vm.countryName = "";
                    vm.generateNewCountry();
                }

                else {
                    GameData.setPoints(vm.points);
                    GameData.setAnswer(vm.answer);
                    $location.path('/game-over');
                }
            }
        }

        vm.generateNewCountry();
    });
