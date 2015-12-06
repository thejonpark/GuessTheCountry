angular
    .module('guessTheCountry')
    .controller('HomeController', function($location) {
        var vm = this;

        vm.startGame = function() {
            $location.path('/game');
        }
    });
