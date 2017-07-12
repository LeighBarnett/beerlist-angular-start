app.controller('masterController', function($uibModal, $scope, authFactory) {
    $scope.currentUser = authFactory.currentUser;
    authFactory.getCurrentUser();
    $scope.logout = function() {
        authFactory.logout($scope.currentUser)
    };
  



  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

});
