angular
    .module('guessTheCountry')
    .controller('GameController', function($location, Countries, Flickr, GameData) {
        var vm = this;
        vm.points = 0;
        vm.answer = {};
        vm.loading = true;
        vm.photoList = [];
        vm.firstLetter = "";
        vm.lastLetter = "";

        vm.getRandomCountry = function() {
            return Countries.getAllCountries().then(function(countries) {
                var randomNumber = Math.floor(Math.random() * countries.length);
                return countries[randomNumber]
            });
        };

        vm.generateNewCountry = function() {
            vm.loading = true;
            vm.getRandomCountry().then(function(country) {
                vm.answer = country.name;
                vm.firstLetter = country.name.charAt(0);
                vm.lastLetter = country.name.slice(-1);
                Flickr.getPlaceID(country.name).then(function(place_id) {
                    Flickr.getPhotos(place_id).then(function(photos) {
                        vm.photoList = [];

                        // returns a new country if not enough photos are there
                        if(photos.length < 5) {
                            vm.generateNewCountry();
                        }

                        photos.forEach(function(photo) {
                            var photoUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';
                            vm.photoList.push(photoUrl);
                        });

                        vm.loading = false;
                        console.log('The answer is ' + vm.answer);
                    });
                });
            });
        }

        vm.submitAnswer = function() {
            if(vm.countryName && 0 != vm.countryName.length) {
                if(vm.answer.toLowerCase().trim() == vm.countryName.toLowerCase().trim()) {
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
