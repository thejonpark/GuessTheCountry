angular
    .module('guessTheCountry')
    .factory('GameData', function() {
        var vm = this;
        vm.points = 0;
        vm.answer = "";

        return {
            setPoints: function(points) {
                vm.points = points;
            },

            getPoints: function() {
                return vm.points;
            },

            setAnswer: function(answer) {
                vm.answer = answer;
            },

            getAnswer: function() {
                return vm.answer;
            }
        };
    });
