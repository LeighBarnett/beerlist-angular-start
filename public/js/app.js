var app = angular.module('goalist', ['ui.bootstrap', 'ui.router', 'datetime']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

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
        })
        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'authCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'authCtrl'
        })

    $urlRouterProvider.otherwise('/home');
}]);
