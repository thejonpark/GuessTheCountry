angular
    .module('guessTheCountry')
    .controller('GameOverController', function($location, GameData) {
        var vm = this;
        vm.points = GameData.getPoints();
        vm.answer = GameData.getAnswer();

        vm.startGame = function() {
            $location.path('/game');
        }
    });
