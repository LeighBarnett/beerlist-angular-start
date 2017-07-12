app.controller('authCtrl', function($scope, authFactory, $state) {
    $scope.register = function() {
        authFactory.register($scope.user)
            .then(function() {
                $state.go('home')

            })
            .catch(function(error) {
                alert(error.data.message)
            });
    };
    $scope.login = function() {
        authFactory.login($scope.user)
            .then(function() {
                $state.go('home')

            })
            .catch(function(error) {
                alert(error.data.message)
            });
    }
});
