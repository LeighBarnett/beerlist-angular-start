var app = angular.module('goalist', ['ui.bootstrap', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'goalController',
            templateUrl: '/templates/home.html'
        })
        .state('goal', {
            url: '/goal/:id',
            params: {
                goalParam: null,
                id: null
            },
            controller: 'goalIndividualController',
            templateUrl: '/templates/goal.html',
        });

    $urlRouterProvider.otherwise('/home');
}]);
