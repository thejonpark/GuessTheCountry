angular
  .module('guessTheCountry', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: '/templates/home.html',
          controller: 'HomeController',
          controllerAs: 'vm'
      })
      .when('/game', {
          templateUrl: '/templates/game.html',
          controller: 'GameController',
          controllerAs: 'vm'
      })
      .when('/game-over', {
          templateUrl: '/templates/game-over.html',
          controller: 'GameOverController',
          controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
    });
