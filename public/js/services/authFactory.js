app.factory('authFactory', function($http, $state) {
    var auth = {};

    auth.currentUser = {

    }
    auth.register = function(user) {
        return $http.post('/users/register', user)
            .then(function(response) {
                auth.currentUser.username = response.data.username;
                auth.currentUser.id = response.data._id;
            });
    };
    auth.login = function(user) {
        return $http.post('/users/login', user)
            .then(function(response) {
                auth.currentUser.username = response.data.username;
                auth.currentUser.id = response.data._id;

            })
    };
    auth.getCurrentUser = function() {
        return $http.get('/users/currentUser')
            .then(function(response) {
                auth.currentUser.username = response.data.username;
                auth.currentUser.id = response.data._id;

                if (auth.currentUser.username == null) { $state.go("login") };
            })
    };

    auth.logout = function(currentUser) {
        return $http.get('/users/logout')
            .then(function(response) {
                auth.currentUser.username = null;
                auth.currentUser.id = null;
                $state.go("login")
            })
    };



    return auth;
});
